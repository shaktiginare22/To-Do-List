import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit3, Trash2, Save, X } from 'lucide-react';
import { clsx } from 'clsx';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          'group flex items-center gap-3 p-4 rounded-lg border transition-all duration-200',
          completed
            ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
        )}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(id)}
          className={clsx(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          )}
        >
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-700"
            >
              <Save className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCancel}
              className="p-1 text-gray-600 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        ) : (
          <>
            <span
              className={clsx(
                'flex-1 text-gray-900 dark:text-gray-100 transition-all duration-200',
                completed && 'line-through text-gray-500 dark:text-gray-400'
              )}
            >
              {text}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-700"
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(id)}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoItem;
