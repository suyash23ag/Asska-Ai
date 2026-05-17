import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import CodeBlock from "../../components/CodeBlock";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <div key={i}>
                  {message.img && (
                    <div className="uploadedImageContainer">
                      <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lqip={{ active: true, quality: 20 }}
                        className="uploadedImage"
                      />
                    </div>
                  )}
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                  >
                    <div className="messageIcon">
                      <img 
                        src={message.role === "user" ? "/human1.jpeg" : "/bot.png"} 
                        alt={message.role === "user" ? "User" : "AI"} 
                      />
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
                        {message.parts[0].text}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
