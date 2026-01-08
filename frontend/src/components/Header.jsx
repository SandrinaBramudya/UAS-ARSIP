import { useLang } from "../contexts/LanguageContext";

export default function Header({ onAdd }) {
  const { lang, setLang, t } = useLang();

  return (
    <header className="bg-white dark:bg-gray-900 border-b px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">{t.title}</h1>

      <div className="flex gap-3 items-center">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="id">ID</option>
          <option value="en">EN</option>
        </select>

        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + {t.add}
        </button>
      </div>
    </header>
  );
}
