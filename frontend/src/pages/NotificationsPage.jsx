import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { useNavigate } from "react-router";
import { useNotificationStore } from "../store/notifications.store";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { unreadMessages, clearUnreadMessage } = useNotificationStore();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  const hasFriendReqs =
    incomingRequests.length > 0 || acceptedRequests.length > 0;
  const hasUnreadMessages = Object.keys(unreadMessages).length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-3 sm:p-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="avatar w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-base-300">
                              <img
                                src={request.sender.profilePic}
                                alt={request.sender.fullName}
                              />
                            </div>
                            <div className="max-w-[180px] sm:max-w-[250px]">
                              <h3 className="font-semibold text-sm sm:text-base truncate">
                                {request.sender.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className="card-body p-3 sm:p-4">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="avatar mt-1 size-8 sm:size-10 rounded-full">
                              <img
                                src={notification.recipient.profilePic}
                                alt={notification.recipient.fullName}
                              />
                            </div>
                            <div className="flex-1 min-w-0 max-w-[180px] sm:max-w-[250px]">
                              <h3 className="font-semibold text-sm sm:text-base truncate">
                                {notification.recipient.fullName}
                              </h3>
                              <p className="text-sm my-1 truncate overflow-hidden text-ellipsis">
                                {notification.recipient.fullName} accepted your
                                friend request
                              </p>
                              <p className="text-xs flex items-center opacity-70">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Recently
                              </p>
                            </div>
                          </div>
                          <div className="badge badge-success badge-sm sm:badge-md self-start">
                            <MessageSquareIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasUnreadMessages && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquareIcon className="h-5 w-5 text-info" />
                  New Messages
                  <span className="badge badge-info ml-2">
                    {Object.keys(unreadMessages).length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {Object.entries(unreadMessages).map(
                    ([senderId, messages]) => {
                      const lastMessage = messages[messages.length - 1];
                      return (
                        <div
                          key={senderId}
                          className="card bg-base-200 shadow-sm hover:shadow-md cursor-pointer"
                          onClick={() => {
                            clearUnreadMessage(senderId);
                            navigate(`/chat/${senderId}`);
                          }}
                        >
                          <div className="card-body p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                            <div className="avatar mt-1 size-8 sm:size-10 rounded-full">
                              <img
                                src={lastMessage.senderPic}
                                alt={lastMessage.senderName}
                              />
                            </div>
                            <div className="flex-1 min-w-0 max-w-[180px] sm:max-w-[250px]">
                              <h3 className="font-semibold text-sm sm:text-base truncate">
                                {lastMessage.senderName}
                              </h3>
                              <p className="text-sm mt-1 truncate overflow-hidden text-ellipsis">
                                {lastMessage.text}
                              </p>
                              <p className="text-xs flex items-center opacity-70 mt-1">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Just now
                              </p>
                            </div>
                            <div className="badge badge-info badge-sm sm:badge-md">
                              <MessageSquareIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                              {messages.length} Message
                              {messages.length > 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </section>
            )}

            {!hasFriendReqs && !hasUnreadMessages && <NoNotificationsFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
