// import { getPortfolioData } from './model/getPortfolioData';
// import { CyberHeading } from '@/shared/ui/CyberHeading';
// import { Container } from '@/shared/ui/Container';
// import { AssetsList } from './ui/AssetsList';
// import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
// import { Button } from '@/shared/ui/Button';
// import { AddAssetsForm } from './ui/AddAssetsForm';

// export const DashboardScreen = async () => {
//   const formattedAssets = await getPortfolioData();

//   return (
//     <Container maxWidth="7xl">
//       <div className="mb-8 flex items-center justify-between">
//         <CyberHeading as="h1">
//           Баланс и текущее состояние вашего крипто-портфеля
//         </CyberHeading>
//         <ResponsiveSidebar
//           title="Добавить новый актив"
//           description="Зафиксируйте объем и стоимость покупки монеты в вашем портфеле"
//           trigger={
//             <Button size="sm" variant="amber">
//               Добавить актив
//             </Button>
//           }
//         >
//           <div className="p-2">
//             <AddAssetsForm />
//           </div>
//         </ResponsiveSidebar>
//       </div>
//       <div className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
//         <div className="md:col-span-2">
//           <AssetsList assets={formattedAssets} />
//         </div>

//         <div className="md:col-span-3">
//           <h1 className="text-xl font-black tracking-wider text-white uppercase">
//             TEST
//           </h1>
//         </div>
//       </div>
//     </Container>
//   );
// };

// 🌟 Импортируем менеджер кэша для опций селекта
import { getPortfolioData } from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetsList } from './ui/AssetsList';
import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
import { Button } from '@/shared/ui/Button';
import { AddAssetsForm } from './ui/AddAssetsForm';
import { CryptoStoreManager } from '@/storage';

/**
 * 🛸 СЕРВЕРНЫЙ ЭКРАН: Главная панель инвестора
 */
export const DashboardScreen = async () => {
  // 1. Параллельно извлекаем рассчитанный портфель и опции криптовалют для формы [5.2]
  const [formattedAssets, coinOptions] = await Promise.all([
    getPortfolioData(),
    CryptoStoreManager.getCoinsForSelect(), // 🌟 Получаем массив [{ label, value }] для выпадающего списка
  ]);

  return (
    <Container maxWidth="7xl">
      {/* ВЕРХНЯЯ ИНТЕРАКТИВНАЯ ПАНЕЛЬ ШАПКИ */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CyberHeading as="h1">
          Баланс и текущее состояние вашего крипто-портфеля
        </CyberHeading>

        {/* НАШ СТЕКЛЯННЫЙ АБСТРАКТНЫЙ САЙДБАР */}
        <ResponsiveSidebar
          title="Добавить новый актив"
          description="Зафиксируйте объем и стоимость покупки монеты в вашем портфеле"
          trigger={
            <Button size="sm" variant="amber">
              Добавить актив
            </Button>
          }
        >
          <div className="p-2">
            {/* 🟢 ИСПРАВЛЕНО: Спустили в форму живые опции монет, подгруженные с сервера! */}
            <AddAssetsForm coinOptions={coinOptions} />
          </div>
        </ResponsiveSidebar>
      </div>

      {/* АДАПТИВНАЯ СЕТКА ИНТЕРФЕЙСА (Пропорции 2fr на 3fr) */}
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
        {/* Левая часть: Строки активов портфеля */}
        <div className="md:col-span-2">
          <AssetsList assets={formattedAssets} />
        </div>

        {/* Правая часть: Зона будущих графиков аналитики */}
        <div className="md:col-span-3">
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/20 p-6 backdrop-blur-md">
            <h1 className="font-mono text-xl font-black tracking-wider text-zinc-600 uppercase">
              Зона аналитики и графиков 📈
            </h1>
          </div>
        </div>
      </div>
    </Container>
  );
};
