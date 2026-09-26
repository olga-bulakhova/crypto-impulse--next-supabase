'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export const DeleteAlertButton = ({ alertId }: { alertId: number }) => {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите убрать эту монету с радара?')) return;
    setIsDeleting(true);

    try {
      // Нативный чистый запрос DELETE в Supabase PostgreSQL [5.2]
      const { error } = await supabase
        .from('user_alerts')
        .delete()
        .eq('id', alertId);

      if (error) throw error;

      router.refresh(); // Обновляем данные на сервере [5.2]
    } catch (error) {
      console.error('[DELETE_ALERT_ERROR]', error);
      alert('Не удалось удалить подписку');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-500 transition-all hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400 disabled:pointer-events-none disabled:opacity-40"
      title="Удалить подписку"
    >
      {isDeleting ? (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-600 border-t-red-400" />
      ) : (
        <svg
          xmlns="http://w3.org"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.842 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM6.747 6.16l.775 9.691a1.25 1.25 0 0 0 1.246 1.149h2.464a1.25 1.25 0 0 0 1.246-1.149l.775-9.69a43.2 43.2 0 0 0-6.506 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};
