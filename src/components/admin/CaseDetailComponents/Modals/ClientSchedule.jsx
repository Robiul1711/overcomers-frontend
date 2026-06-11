import React from 'react';
import { X, ChevronDown, Plus, Trash2, Loader2 } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import useMutationClient from '@/hooks/useMutationClient';

const ClientSchedule = ({ isOpen, onClose }) => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      category: "",
      start_date: "",
      level: "",
      type: "",
      description: "",
      tasks: [{ value: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks"
  });

  const { mutate, isPending } = useMutationClient({
    url: `/employee/clinical-programs`,
    method: "post",
    invalidateKeys: [["clinical-programs"]],
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      tasks: data.tasks.map(t => t.value).filter(val => val && val.trim() !== "")
    };
    mutate({ data: formattedData }, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-Third/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-[650px] rounded-xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400"
      >
        
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-Third tracking-tight">Add Program</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Clinical Protocol Entry</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-5">
          
          {/* Title Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Program Title *</label>
            <input 
              type="text" 
              placeholder="e.g., Social Initiation Protocol" 
              {...register("title", { required: "Program Title is required" })}
              className={`w-full bg-gray-50/50 border rounded-xl py-3 px-4 outline-none focus:border-Primary focus:ring-4 focus:ring-Primary/5 transition-all text-[14px] font-bold text-Third ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.title && <p className="text-red-500 text-xs font-bold pl-1">{errors.title.message}</p>}
          </div>

          {/* Selectors & Date Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Category *</label>
              <div className="relative group">
                <select 
                  {...register("category", { required: "Category is required" })}
                  className={`w-full bg-gray-50/50 border rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third hover:border-gray-300 transition-colors ${errors.category ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <option value="">Select Category</option>
                  <option value="Communication">Communication</option>
                  <option value="Social Skills">Social Skills</option>
                  <option value="Behavior Reduction">Behavior Reduction</option>
                  <option value="Daily Living Skills">Daily Living Skills</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.category && <p className="text-red-500 text-xs font-bold pl-1">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Start Date *</label>
              <div className="relative">
                <input 
                  type="date" 
                  {...register("start_date", { required: "Start Date is required" })}
                  className={`w-full bg-gray-50/50 border rounded-xl py-3 px-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third ${errors.start_date ? 'border-red-500' : 'border-gray-200'}`}
                />
              </div>
              {errors.start_date && <p className="text-red-500 text-xs font-bold pl-1">{errors.start_date.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Level *</label>
              <div className="relative group">
                <select 
                  {...register("level", { required: "Level is required" })}
                  className={`w-full bg-gray-50/50 border rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third ${errors.level ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.level && <p className="text-red-500 text-xs font-bold pl-1">{errors.level.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Type *</label>
              <div className="relative group">
                <select 
                  {...register("type", { required: "Type is required" })}
                  className={`w-full bg-gray-50/50 border rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third ${errors.type ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <option value="">Select Type</option>
                  <option value="Skill_Acquisition">Skill Acquisition</option>
                  <option value="Behavior_Intervention">Behavior Intervention</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.type && <p className="text-red-500 text-xs font-bold pl-1">{errors.type.message}</p>}
            </div>
          </div>

          {/* Task List */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Task List *</label>
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={`e.g., Task ${index + 1} - Description`}
                    {...register(`tasks.${index}.value`, { required: "Task description is required" })}
                    className={`flex-1 bg-gray-50/50 border rounded-xl py-3 px-4 outline-none focus:border-Primary text-[14px] font-bold text-Third ${errors.tasks?.[index]?.value ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-[13px] p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="mt-1 flex items-center justify-center gap-1.5 py-3 border-2 border-dashed border-gray-200 hover:border-Secondary/30 text-gray-500 hover:text-Secondary font-bold text-[13px] rounded-xl transition-all active:scale-98"
            >
              <Plus size={16} /> Add Task Input
            </button>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Description *</label>
            <textarea 
              rows={3}
              placeholder="Detailed program description..." 
              {...register("description", { required: "Description is required" })}
              className={`w-full bg-gray-50/50 border rounded-xl p-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs font-bold pl-1">{errors.description.message}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-50 flex items-center justify-end gap-3 bg-gray-50/30">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-Secondary font-bold text-[13px] rounded-xl hover:bg-gray-100 transition-all uppercase tracking-wide"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isPending}
            className="px-8 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl shadow-lg shadow-Secondary/10 hover:bg-Secondary/90 active:scale-95 transition-all uppercase tracking-wide flex items-center gap-2"
          >
            {isPending ? (
              <>
                Saving... <Loader2 className="animate-spin" size={16} />
              </>
            ) : (
              "Add Program"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientSchedule;
