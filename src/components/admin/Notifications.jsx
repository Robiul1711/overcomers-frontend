import React from 'react';
import { Bell, Trash2, FileText, CheckCircle, AlertTriangle, ArrowUpRight, Eye, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useClient from '@/hooks/useClient';
import useMutationClient from '@/hooks/useMutationClient';

const TAG_MAP = {
  ASSIGNMENT: { icon: FileText, label: 'Assignment' },
  SYSTEM: { icon: Bell, label: 'System' },
  CERTIFICATION: { icon: CheckCircle, label: 'Certification' },
  ALERT: { icon: AlertTriangle, label: 'Alert' },
};

const Notifications = () => {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const { data, isLoading, isError, refetch } = useClient({
    queryKey: ['employeeNotifications'],
    url: '/employee/notifications',
  });

  const notifications = data?.data?.notifications || [];
  const unreadCount = data?.data?.unread_count ?? 0;
  const pagination = data?.data?.pagination || {};

  // Delete single notification
  const { mutate: deleteNotification } = useMutationClient({
    url: (id) => `/employee/notifications/${id}`,
    method: 'delete',
    invalidateKeys: [['employeeNotifications']],
    successMessage: 'Notification deleted',
  });

  // Mark single notification as read
  const { mutate: markAsRead } = useMutationClient({
    url: (id) => `/employee/notifications/${id}/mark-read`,
    method: 'post',
    invalidateKeys: [['employeeNotifications']],
    successMessage: 'Marked as read',
  });

  // Mark all as read
  const { mutate: markAllRead, isPending: isMarkingAll } = useMutationClient({
    url: '/employee/notifications/mark-all-read',
    method: 'post',
    invalidateKeys: [['employeeNotifications']],
    successMessage: 'All notifications marked as read',
  });

  // Clear all notifications
  const { mutate: clearAll, isPending: isClearingAll } = useMutationClient({
    url: '/employee/notifications/clear-all',
    method: 'post',
    invalidateKeys: [['employeeNotifications']],
    successMessage: 'All notifications cleared',
  });

  const getTagInfo = (tag) => TAG_MAP[tag] || { icon: Bell, label: tag || 'Notification' };

  const SkeletonBox = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 md:gap-6 font-poppins pb-10 px-1 md:px-0'>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shrink-0">
            <div className="flex flex-col gap-2">
              <SkeletonBox className="h-6 w-36" />
              <SkeletonBox className="h-4 w-48" />
            </div>
            <SkeletonBox className="h-10 w-32 rounded-xl" />
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 md:p-5">
                <SkeletonBox className="w-10 h-10 md:w-11 md:h-11 rounded-xl shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <SkeletonBox className="h-5 w-48" />
                  <SkeletonBox className="h-4 w-full max-w-md" />
                  <SkeletonBox className="h-3 w-28 mt-1" />
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
      <div className='flex flex-col gap-4 md:gap-6 font-poppins pb-10 px-1 md:px-0'>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-20 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400">
            <AlertTriangle size={32} />
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
    <div className='flex flex-col gap-4 md:gap-6 font-poppins pb-10 px-1 md:px-0'>
      {/* Content Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <div className="w-1 h-5 bg-Secondary rounded-full"></div>
               <h3 className="text-lg md:text-xl font-bold text-Third leading-none">Activity Feed</h3>
            </div>
            <p className="text-gray-500 text-xs md:text-[13px] font-medium">
              You have{' '}
              <span className="text-Secondary font-bold text-xs">
                {unreadCount} unread
              </span>{' '}
              update{unreadCount !== 1 ? 's' : ''} pending
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead()}
                disabled={isMarkingAll}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-green-200 text-green-600 font-bold text-[12px] rounded-xl hover:bg-green-50 hover:border-green-300 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCheck size={14} strokeWidth={2.5} />
                {isMarkingAll ? 'Marking...' : 'Mark All Read'}
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => clearAll()}
                disabled={isClearingAll}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-red-200 text-red-500 font-bold text-[12px] rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isClearingAll ? 'Clearing...' : 'Clear All'}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {notifications.map((item) => {
            const tagInfo = getTagInfo(item.tag);
            const TagIcon = tagInfo.icon;

            return (
              <div
                key={item.id}
                className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 md:p-5 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  !item.is_read ? 'bg-Secondary/[0.03]' : 'bg-white hover:bg-gray-50/30'
                }`}
                onClick={() => {
                  setSelectedNotification(item);
                  if (!item.is_read) markAsRead(item.id);
                }}
              >
                <div className="flex gap-4 items-start">
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${
                     !item.is_read ? 'bg-Secondary text-white' : 'bg-gray-50 border border-gray-100 text-gray-400'
                  }`}>
                    <TagIcon size={18} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                       <h4 className={`font-bold text-Third text-[15px] md:text-[16px] leading-tight line-clamp-1 transition-colors ${!item.is_read ? 'group-hover:text-Secondary' : 'text-gray-400'}`}>{item.title}</h4>
                       {!item.is_read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-Secondary animate-pulse"></span>
                       )}
                    </div>
                    <p className="text-gray-500 text-[13px] md:text-[14px] font-medium max-w-3xl leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-4 mt-1">
                       <span className="text-Secondary font-semibold text-[10px] md:text-[11px]">{item.created_at}</span>
                       <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                       <span className="text-gray-400 font-semibold text-[10px] md:text-[11px]">{tagInfo.label}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full xl:w-auto mt-2 xl:mt-0 relative z-10">
                  {/* Mark as read button (only for unread) */}
                  {!item.is_read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(item.id);
                      }}
                      className="p-2.5 bg-white border border-green-200 text-green-500 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all shadow-sm active:scale-95 shrink-0"
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
                    className="flex-1 xl:flex-none items-center gap-1 px-5 py-2.5 bg-white border border-Secondary/20 text-Secondary font-bold text-[12px] rounded-xl hover:bg-Secondary hover:text-white transition-all shadow-sm active:scale-95 whitespace-nowrap"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(item.id);
                    }}
                    className="p-2.5 bg-white border border-Secondary/10 text-Secondary rounded-xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm active:scale-95 shrink-0"
                    title="Delete notification"
                  >
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Unread Indicator Bar */}
                {!item.is_read && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-Secondary"></div>
                )}
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
           <div className="p-16 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                 <Bell size={32} />
              </div>
              <div>
                 <h4 className="text-lg font-bold text-Third">Nothing to report</h4>
                 <p className="text-gray-400 text-sm">We'll let you know when something comes up!</p>
              </div>
           </div>
        )}

        {/* Pagination Info */}
        {pagination?.total > pagination?.per_page && (
          <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/30">
            <p className="text-gray-400 text-[11px] font-medium text-center">
              Page {pagination.current_page} of {pagination.last_page} ({pagination.total} total)
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[480px] p-0 rounded-2xl overflow-hidden border-none shadow-2xl font-poppins">
          {selectedNotification && (
            <div className="p-5 sm:p-6 flex flex-col gap-4 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className={`p-2.5 rounded-xl ${
                  !selectedNotification.is_read ? 'bg-Secondary text-white' : 'bg-gray-100 text-gray-400'
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

export default Notifications;
