import CameraManager from "@/components/camera/CameraManager";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CameraManager />
    </main>
  );
}
