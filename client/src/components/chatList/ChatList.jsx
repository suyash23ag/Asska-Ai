import { Link, useNavigate } from "react-router-dom";
import "./chatList.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ChatList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (chatId) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
    },
  });

  const handleDelete = (e, chatId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteMutation.mutate(chatId);
      // Navigate to dashboard if we're currently viewing the deleted chat
      if (window.location.pathname.includes(chatId)) {
        navigate("/dashboard");
      }
    }
  };

  // Sort chats newest first
  const sortedChats = data
    ? [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore ASSka AI</Link>
      <Link to="/contact">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : sortedChats.length === 0 ? (
          <span className="noChats">No chats yet</span>
        ) : (
          sortedChats.map((chat) => (
            <div key={chat._id} className="chatItem">
              <Link to={`/dashboard/chats/${chat._id}`} className="chatLink">
                {chat.title}
              </Link>
              <button
                className="deleteBtn"
                onClick={(e) => handleDelete(e, chat._id)}
                title="Delete chat"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>ASSka AI Pro</span>
          <span>Manage your subscription</span>
        </div>
      </div>
      <div className="billingLinks">
        <Link to="/dashboard/billing" className="billingBtn">
          ⚡ Billing &amp; Plans
        </Link>
      </div>
    </div>
  );
};

export default ChatList;
