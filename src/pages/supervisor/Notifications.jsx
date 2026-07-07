import React from "react";
import {
  Bell,
  Trash2,
  FilePlus,
  AlertCircle,
  FileText,
  Eye,
  CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

const TAG_MAP = {
  ASSIGNMENT: { icon: FilePlus, label: "Assignment" },
  SYSTEM: { icon: Bell, label: "System" },
  CERTIFICATION: { icon: FileText, label: "Certification" },
  ALERT: { icon: AlertCircle, label: "Alert" },
};

const SupervisorNotifications = () => {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const { data, isLoading, isError, refetch } = useClient({
    queryKey: ["supervisorNotifications"],
    url: "/supervisor/notifications",
  });

  const notifications = data?.data?.notifications || [];
  const unreadCount = data?.data?.unread_count ?? 0;

  // Delete single notification
  const { mutate: deleteNotification } = useMutationClient({
    url: (id) => `/supervisor/notifications/${id}`,
    method: "delete",
    invalidateKeys: [["supervisorNotifications"]],
    successMessage: "Notification deleted",
  });

  // Mark single notification as read
  const { mutate: markAsRead } = useMutationClient({
    url: (id) => `/supervisor/notifications/${id}/mark-read`,
    method: "post",
    invalidateKeys: [["supervisorNotifications"]],
    successMessage: "Marked as read",
  });

  // Mark all as read
  const { mutate: markAllRead, isPending: isMarkingAll } = useMutationClient({
    url: "/supervisor/notifications/mark-all-read",
    method: "post",
    invalidateKeys: [["supervisorNotifications"]],
    successMessage: "All notifications marked as read",
  });

  // Clear all notifications
  const { mutate: clearAll, isPending: isClearingAll } = useMutationClient({
    url: "/supervisor/notifications/clear-all",
    method: "post",
    invalidateKeys: [["supervisorNotifications"]],
    successMessage: "All notifications cleared",
  });

  const getTagInfo = (tag) => TAG_MAP[tag] || { icon: Bell, label: tag || "Notification" };

  const SkeletonBox = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div className="space-y-2">
              <SkeletonBox className="h-6 w-36" />
              <SkeletonBox className="h-4 w-48" />
            </div>
            <SkeletonBox className="h-10 w-40 rounded-xl" />
          </div>
          <div className="divide-y divide-gray-100 -mx-4 sm:-mx-6 md:-mx-8 border-t border-gray-100">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-4 sm:px-6 md:px-8 py-4 md:py-5 flex items-start gap-4">
                <SkeletonBox className="w-10 h-10 md:w-11 md:h-11 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-5 w-48" />
                  <SkeletonBox className="h-4 w-full max-w-md" />
                  <SkeletonBox className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
        <div className="bg-white p-6 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-20 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400">
            <AlertCircle size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-Third">Failed to load notifications</h4>
            <p className="text-gray-400 text-sm">Please try again later</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 bg-Secondary text-white font-bold text-[13px] rounded-xl hover:bg-Secondary/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
      {/* Notifications Section */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold text-Third tracking-tight leading-tight">Notifications</h3>
            <p className="text-xs md:text-[13px] font-medium text-gray-500 mt-1">
              You have{' '}
              <span className="text-Secondary font-bold">{unreadCount} unread</span> notification{unreadCount !== 1 ? 's' : ''}
            </p>
            <div className="absolute -bottom-2 left-0 w-16 h-[3px] bg-Primary rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead()}
                disabled={isMarkingAll}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-green-200 text-green-600 font-bold text-[12px] rounded-xl hover:bg-green-50 hover:border-green-300 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                <CheckCheck size={14} strokeWidth={2.5} />
                {isMarkingAll ? "Marking..." : "Mark All Read"}
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => clearAll()}
                disabled={isClearingAll}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-red-200 text-red-500 font-bold text-[12px] rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {isClearingAll ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100 -mx-4 sm:-mx-6 md:-mx-8 border-t border-gray-100">
          {notifications.length === 0 ? (
            <div className="px-6 md:px-10 py-16 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Bell size={32} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-Third">Nothing to report</h4>
                <p className="text-gray-400 text-sm">We'll let you know when something comes up!</p>
              </div>
            </div>
          ) : (
            notifications.map((item) => {
              const tagInfo = getTagInfo(item.tag);
              const TagIcon = tagInfo.icon;

              return (
                <div
                  key={item.id}
                  className={`px-4 sm:px-6 md:px-8 py-4 md:py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all cursor-pointer group relative hover:bg-gray-50/30 ${
                    !item.is_read ? "bg-Secondary/[0.03]" : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedNotification(item);
                    if (!item.is_read) markAsRead(item.id);
                  }}
                >
                  {!item.is_read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-Secondary animate-pulse"></div>
                  )}

                  <div className="flex items-start gap-4 flex-1 w-full">
                    <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-105 shadow-sm ${
                      !item.is_read ? "bg-Secondary text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      <TagIcon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className={`text-[15px] md:text-[16px] font-bold tracking-tight transition-colors ${!item.is_read ? "text-Third group-hover:text-Secondary" : "text-gray-400"}`}>
                          {item.title}
                        </h4>
                        {item.is_prioritized && (
                          <span className="w-fit bg-Primary text-Secondary px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border border-Primary/20">
                            Prioritized
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] md:text-[14px] text-gray-500 font-medium leading-relaxed max-w-2xl line-clamp-2">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {!item.is_read && <div className="w-1.5 h-1.5 rounded-full bg-Primary/55 animate-ping"></div>}
                        <p className="text-[10px] font-bold text-Secondary opacity-85 leading-none">
                          {item.created_at}
                        </p>
                        <span className="text-[10px] font-semibold text-gray-400 ml-2">
                          · {tagInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full lg:w-auto mt-3 lg:mt-0 relative z-10">
                    {/* Mark as read button (unread only) */}
                    {!item.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(item.id);
                        }}
                        className="p-2.5 bg-white border border-green-200 text-green-500 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all shadow-sm active:scale-90"
                        title="Mark as read"
                      >
                        <Eye size={16} strokeWidth={2.5} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotification(item);
                        if (!item.is_read) markAsRead(item.id);
                      }}
                      className="flex-1 lg:flex-none bg-Secondary text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-Secondary/90 active:scale-95 transition-all shadow-sm whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(item.id);
                      }}
                      className="p-2.5 bg-gray-100 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all group/delete shadow-sm border border-transparent hover:border-red-100 active:scale-90"
                    >
                      <Trash2 size={16} strokeWidth={2.5} className="group-hover/delete:scale-105 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[480px] p-0 rounded-2xl overflow-hidden border-none shadow-2xl font-poppins">
          {selectedNotification && (
            <div className="p-5 sm:p-6 flex flex-col gap-4 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className={`p-2.5 rounded-xl ${
                  !selectedNotification.is_read ? "bg-Secondary text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {React.createElement(getTagInfo(selectedNotification.tag).icon, { size: 20, strokeWidth: 2.5 })}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-bold text-Secondary uppercase tracking-widest bg-Secondary/10 px-1.5 py-0.5 rounded">
                    {getTagInfo(selectedNotification.tag).label}
                  </span>
                  <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{selectedNotification.created_at}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-Third leading-snug">
                  {selectedNotification.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="w-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-bold text-[12px] py-2.5 rounded-xl transition-all uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupervisorNotifications;

