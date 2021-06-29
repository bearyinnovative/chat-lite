import dynamic from 'next/dynamic';
const DynamicApp = dynamic(() => import('../components/App'));

export default function Chat() {
  return <DynamicApp />
}
