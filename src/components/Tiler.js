function Tiler({ items, card: CardComponent }) {

  return (
    <div className="cards-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 250px)',
      gridTemplateRows: 'auto 1fr auto',
      width: '100%',
      gap: '1.5%',
      padding: '5%',
      maxWidth: '85%',
      justifyContent: 'center',
      margin: '0 auto'
    }}>
      {items.map(item => (
        <CardComponent key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Tiler;
