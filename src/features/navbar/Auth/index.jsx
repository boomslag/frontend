import DarkModeButton from '@/components/DarkModeButton.jsx';
import GlobeButton from '@/components/GlobeButton';

export default function AuthLinks() {
  return (
    <ul className="ml-1 flex space-x-6">
      <GlobeButton />
      <DarkModeButton />
    </ul>
  );
}
