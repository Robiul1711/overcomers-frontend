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
      <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
        <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6] overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 md:mb-12">
            <div className="space-y-2">
              <SkeletonBox className="h-8 w-44" />
              <SkeletonBox className="h-4 w-56" />
            </div>
            <SkeletonBox className="h-12 w-52 rounded-xl" />
          </div>
          <div className="divide-y divide-gray-100 -mx-6 md:-mx-10 border-t border-gray-100">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-6 md:px-10 py-6 md:py-8 flex items-start gap-5">
                <SkeletonBox className="w-14 h-14 rounded-[20px] shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-6 w-64" />
                  <SkeletonBox className="h-4 w-full max-w-lg" />
                  <SkeletonBox className="h-3 w-24" />
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
      <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
        <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6] overflow-hidden p-20 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-400">
            <AlertCircle size={40} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-Third">Failed to load notifications</h4>
            <p className="text-gray-400 text-sm">Please try again later</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl hover:bg-Secondary/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 font-poppins">
      {/* Notifications Section */}
      <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6] overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 md:mb-12">
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-black text-Third tracking-tight leading-tight">Notifications</h3>
            <p className="text-[12px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
              You have{' '}
              <span className="text-Secondary font-black">{unreadCount} unread</span> notification{unreadCount !== 1 ? 's' : ''}
            </p>
            <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead()}
                disabled={isMarkingAll}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-green-300/50 text-green-600 font-bold text-[13px] rounded-xl md:rounded-2xl hover:bg-green-50 hover:border-green-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                <CheckCheck size={16} strokeWidth={2.5} />
                {isMarkingAll ? "Marking..." : "Mark All Read"}
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => clearAll()}
                disabled={isClearingAll}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-red-300/50 text-red-500 font-bold text-[13px] rounded-xl md:rounded-2xl hover:bg-red-50 hover:border-red-400 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {isClearingAll ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100 -mx-6 md:-mx-10 border-t border-gray-100">
          {notifications.length === 0 ? (
            <div className="px-6 md:px-10 py-20 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Bell size={40} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-Third">Nothing to report</h4>
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
                  className={`px-6 md:px-10 py-6 md:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all cursor-pointer group relative hover:bg-gray-50/50 ${
                    !item.is_read ? "bg-Secondary/5" : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedNotification(item);
                    if (!item.is_read) markAsRead(item.id);
                  }}
                >
                  {!item.is_read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-Secondary animate-pulse"></div>
                  )}

                  <div className="flex items-start gap-5 md:gap-6 flex-1 w-full">
                    <div className={`p-4 rounded-[20px] md:rounded-[24px] shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg ${
                      !item.is_read ? "bg-Secondary text-white shadow-Secondary/20" : "bg-gray-100 text-gray-400 shadow-gray-200"
                    }`}>
                      <TagIcon size={22} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1.5">
                        <h4 className={`text-[17px] md:text-[20px] font-black tracking-tight leading-tight transition-colors ${!item.is_read ? "text-Third group-hover:text-Secondary" : "text-gray-400"}`}>
                          {item.title}
                        </h4>
                        {item.is_prioritized && (
                          <span className="w-fit bg-Primary text-Secondary px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-Primary/20">
                            Prioritized
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] md:text-[15px] text-gray-500 font-bold leading-relaxed max-w-2xl line-clamp-2 uppercase tracking-tight opacity-70">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-2 mt-3.5">
                        {!item.is_read && <div className="w-2 h-2 rounded-full bg-Primary/40 animate-ping"></div>}
                        <p className="text-[11px] font-black text-Secondary group-hover:text-Secondary uppercase tracking-[0.2em] opacity-80 leading-none">
                          {item.created_at}
                        </p>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 opacity-50">
                          · {tagInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 relative z-10">
                    {/* Mark as read button (unread only) */}
                    {!item.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(item.id);
                        }}
                        className="p-3.5 bg-white border border-green-200/50 text-green-500 rounded-xl md:rounded-2xl hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all shadow-sm active:scale-90"
                        title="Mark as read"
                      >
                        <Eye size={18} strokeWidth={2.5} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotification(item);
                        if (!item.is_read) markAsRead(item.id);
                      }}
                      className="flex-1 lg:flex-none bg-Secondary text-white px-8 py-3.5 rounded-xl md:rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-Secondary/90 active:scale-95 transition-all shadow-xl shadow-Secondary/10 whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(item.id);
                      }}
                      className="p-3.5 bg-gray-100 text-gray-400 rounded-xl md:rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all group/delete shadow-sm border border-transparent hover:border-red-100 active:scale-90"
                    >
                      <Trash2 size={20} strokeWidth={2.5} className="group-hover/delete:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl font-poppins">
          {selectedNotification && (
            <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className={`p-3.5 rounded-2xl ${
                  !selectedNotification.is_read ? "bg-Secondary text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {React.createElement(getTagInfo(selectedNotification.tag).icon, { size: 24, strokeWidth: 2.5 })}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black text-Secondary uppercase tracking-widest bg-Secondary/10 px-2 py-0.5 rounded-md">
                    {getTagInfo(selectedNotification.tag).label}
                  </span>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">{selectedNotification.created_at}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black text-Third leading-snug">
                  {selectedNotification.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="w-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-black text-[13px] py-3.5 rounded-xl md:rounded-2xl transition-all uppercase tracking-widest"
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
