import BottomDrawer from "@components/Layout/Drawer/BottomDrawer";

export default function NavDrawer() {
  return (
    <div className="hidden w-full h-10 bg-foreground text-background xl:flex justify-center items-center z-20 fixed bottom-0 left-0">
      <BottomDrawer />
    </div>
  );
}
