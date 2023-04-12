import OrderContentItem from './OrderContentItem';

export default function OrderContentList({ order, orderItems }) {
  return (
    <div className="space-y-4">
      {order &&
        orderItems &&
        orderItems.map((item, index) => (
          <OrderContentItem item={item} order={order} key={index} index={index} />
        ))}
    </div>
  );
}
