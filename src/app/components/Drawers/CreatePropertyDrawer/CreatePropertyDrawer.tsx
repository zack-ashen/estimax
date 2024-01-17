import { FaPlus } from 'react-icons/fa6';
import CreatePropertyForm from '../../Forms/CreatePropertyForm/CreatePropertyForm';
import { Button } from '../../Inputs/Button/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '../Base/Drawer';

export default function CreatePropertyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>
          Add Property
          <FaPlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[30rem] p-6">
        <CreatePropertyForm />
      </DrawerContent>
    </Drawer>
  );
}
