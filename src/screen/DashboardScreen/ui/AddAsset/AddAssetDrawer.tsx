import { Button } from '@/shared/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/shared/ui/kit/drawer';
import { AddAssetForm } from './AddAssetForm';

export const AddAssetDrawer = () => {
  return (
    <Drawer swipeDirection="right" modal={true}>
      <DrawerTrigger
        render={
          <Button size="sm" variant="amber">
            Добавить актив
          </Button>
        }
      ></DrawerTrigger>
      <DrawerContent className="w-full md:w-[500px]">
        <div className="p-4">
          <AddAssetForm />
        </div>
        <DrawerFooter className="p-4">
          <DrawerClose
            render={<Button variant="base">Закрыть</Button>}
          ></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
