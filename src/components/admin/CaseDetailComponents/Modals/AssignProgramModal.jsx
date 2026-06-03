import React from 'react';
import { useForm } from 'react-hook-form';
import { X, ChevronDown, ClipboardList, Loader2 } from 'lucide-react';
import useClient from '@/hooks/useClient';
import useMutationClient from '@/hooks/useMutationClient';
import { toast } from 'sonner';

const AssignProgramModal = ({ isOpen, onClose, program }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parent_id: '',
      start_date: '',
      content: '',
    },
  });

  const { data: clients, isLoading: clientsLoading } = useClient({
    queryKey: ['clients'],
    url: '/employee/clients',
  });

  const { mutate, isPending } = useMutationClient({
    url: `/employee/clinical-program-assignments`,
    method: 'post',
    invalidateKeys: [['clinical-programs']],
  });

  const onSubmit = (formData) => {
    const payload = new FormData();
    payload.append('clinical_program_id', program.id);
    payload.append('parent_id', formData.parent_id);
    payload.append('start_date', formData.start_date);
    payload.append('content', formData.content);

    mutate(payload, {
      onSuccess: () => {
        toast.success('Program assigned successfully!');
        reset();
        onClose();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Failed to assign program.');
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-Third/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400"
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-Third tracking-tight">Assign Program</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
              Clinical Assignment
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 max-h-[60vh] overflow-y-auto custom-scrollbar">

          {/* Program Context Card */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-Secondary shadow-sm shrink-0">
              <ClipboardList size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[14px] font-bold text-Third leading-tight truncate">{program.title}</h3>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mt-0.5">
                {program.category} • {program.level}
              </p>
            </div>
          </div>

          {/* Client Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Select Client <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                {...register('parent_id', { required: 'Please select a client' })}
                className={`w-full bg-white border rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third hover:border-gray-300 transition-colors ${
                  errors.parent_id ? 'border-red-400' : 'border-gray-200'
                }`}
              >
                <option value="">
                  {clientsLoading ? 'Loading clients...' : 'Select a client...'}
                </option>
                {clients?.data?.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {errors.parent_id && (
              <p className="text-[11px] text-red-500 font-semibold px-1">{errors.parent_id.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Clinical Start Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              {...register('start_date', { required: 'Start date is required' })}
              className={`w-full bg-white border rounded-xl py-3 px-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third ${
                errors.start_date ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.start_date && (
              <p className="text-[11px] text-red-500 font-semibold px-1">{errors.start_date.message}</p>
            )}
          </div>

          {/* Content / Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Implementation Notes <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Provide specific instructions for this client..."
              {...register('content', { required: 'Implementation notes are required' })}
              className={`w-full bg-white border rounded-xl p-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third resize-none ${
                errors.content ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.content && (
              <p className="text-[11px] text-red-500 font-semibold px-1">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/30">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="px-6 py-2.5 text-Secondary font-bold text-[13px] rounded-xl hover:bg-gray-100 transition-all uppercase tracking-wide disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || clientsLoading}
            className="px-8 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl shadow-lg shadow-Secondary/10 hover:bg-Secondary/90 active:scale-95 transition-all uppercase tracking-wide disabled:opacity-60 flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {isPending ? 'Assigning...' : 'Assign Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignProgramModal;