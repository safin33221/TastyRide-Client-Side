import { useTranslation } from "react-i18next";

const OrDivider = () => {
  const { t } = useTranslation();
  return (
    <div>
      <span className="flex items-center">
        <span className="h-px flex-1 border-b-2"></span>
        <span className="shrink-0 px-6 py-10">{t('login.Or')}</span>
        <span className="h-px flex-1 border-b-2"></span>
      </span>
    </div>
  );
};

export default OrDivider;
