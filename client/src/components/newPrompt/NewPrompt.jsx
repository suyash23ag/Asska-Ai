import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CodeBlock from "../CodeBlock";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ q, a, imgPath }) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q || undefined,
          answer: a,
          img: imgPath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
        formRef.current.reset();
        setQuestion("");
        setAnswer("");
        setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      });
    },
    onError: (err) => console.log(err),
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      // Check if this is an image generation request
      const imageGenKeywords = ['generate image', 'create image', 'draw', 'make image', 'generate picture', 'create picture'];
      const isImageGenRequest = imageGenKeywords.some(keyword => text.toLowerCase().includes(keyword));

      if (isImageGenRequest && !img.aiData?.inlineData) {
        // Handle image generation
        setAnswer("🎨 Generating image...");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/generate-image`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text }),
          }
        );

        if (!response.ok) throw new Error("Image generation failed");

        const data = await response.json();
        const generatedImageUrl = data.imageUrl;

        // Display the generated image
        const imageMarkdown = `![Generated Image](${generatedImageUrl})\n\n✨ **Image generated successfully!** You can:\n- Ask me to modify it\n- Generate another variation\n- Download it by right-clicking`;
        
        setAnswer(imageMarkdown);

        mutation.mutate({
          q: isInitial ? undefined : text,
          a: imageMarkdown,
          imgPath: undefined,
        });

        return;
      }

      // Regular chat flow
      // Build history excluding the last item if it's the initial prompt
      const history = isInitial
        ? []
        : data?.history?.map(({ role, parts }) => ({ role, parts })) || [];

      const body = {
        history,
        question: text,
        ...(img.aiData?.inlineData && {
          imgBase64: img.aiData.inlineData.data,
          imgMimeType: img.aiData.inlineData.mimeType,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ai`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("AI request failed");

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulatedText += decoder.decode(value, { stream: true });
        setAnswer(accumulatedText);
      }

      mutation.mutate({
        q: isInitial ? undefined : text,
        a: accumulatedText,
        imgPath: img.dbData?.filePath || undefined,
      });
    } catch (err) {
      console.log(err);
      const errorMessage = err.message || "Something went wrong. Please try again.";
      if (errorMessage.includes("413") || errorMessage.includes("too large")) {
        setAnswer("❌ Image is too large. Please try a smaller image or reduce the quality.");
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        setAnswer("❌ Network error. Please check your connection and try again.");
      } else {
        setAnswer("❌ Something went wrong. Please try again or try without an image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;
    add(text, false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  };

  const handleInput = (e) => {
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && (
        <div className="message uploadingMessage">
          <div className="uploadProgress">
            📤 Uploading image... {img.uploadProgress ? `${img.uploadProgress}%` : ''}
          </div>
        </div>
      )}
      {img.dbData?.filePath && (
        <div className="uploadedImageContainer">
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="380"
            transformation={[{ width: 380 }]}
            className="uploadedImage"
          />
          <p className="imageHelper">
            💡 <strong>Image uploaded!</strong> Ask me to:
            <br />• Explain what's in this image
            <br />• Solve problems shown in the image
            <br />• Summarize text from the image
            <br />• Answer questions about the image
          </p>
        </div>
      )}
      {question && (
        <div className="message user">
          <div className="messageIcon">
            <img src="/human1.jpeg" alt="User" />
          </div>
          <div className="messageContent">{question}</div>
        </div>
      )}
      {answer && (
        <div className="message">
          <div className="messageIcon">
            <img src="/bot.png" alt="AI" />
          </div>
          <div className="messageContent">
            <Markdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </CodeBlock>
                  ) : (
                    <code className="inlineCode" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {answer}
            </Markdown>
          </div>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <textarea
          ref={textareaRef}
          name="text"
          placeholder="Ask coding, DSA, interview, or theory questions..."
          rows={1}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        <button type="submit">
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
