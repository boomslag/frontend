import { useSelector } from 'react-redux';

export default function useMetadata() {
  const metadata = useSelector((state) => state.metadata.metadata);
  return metadata;
}
