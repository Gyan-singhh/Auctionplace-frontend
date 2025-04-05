import { useEffect, useState } from "react";
import axios from "axios";
import { FiMail, FiMessageSquare, FiClock, FiUser } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/messages`,
          { withCredentials: true }
        );
        if (response.data) {
          setMessages(response?.data?.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
        const matchesSubject =
          subjectFilter === "all" || (message.subject || "") === subjectFilter;

        return matchesSubject;
      })
    : [];

  const getSubjectDisplay = (subject) => {
    switch (subject) {
      case "auction":
        return "Auction Inquiry";
      case "account":
        return "Account Help";
      case "seller":
        return "Seller Questions";
      case "other":
        return "Other";
      case "":
        return "No Subject";
      default:
        return subject || "No Subject";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-3 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow overflow-hidden mx-4">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiMessageSquare className="mr-2 text-emerald-600" />
              Messages
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredMessages.length} message
              {filteredMessages.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="auction">Auction Inquiry</option>
              <option value="account">Account Help</option>
              <option value="seller">Seller Questions</option>
              <option value="other">Other</option>
              <option value="">No Subject</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {message.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {message.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        message.subject === "auction"
                          ? "bg-purple-100 text-purple-800"
                          : message.subject === "account"
                          ? "bg-blue-100 text-blue-800"
                          : message.subject === "seller"
                          ? "bg-green-100 text-green-800"
                          : message.subject === "other"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {getSubjectDisplay(message.subject)}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-500">{message.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-gray-400" />
                      {new Date(message.createdAt).toLocaleDateString()}
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMessages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No messages found matching your criteria
          </div>
        )}

        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={loading}
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
