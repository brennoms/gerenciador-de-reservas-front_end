import ImovelCard from '../components/ImovelCard';

export default function Properties() {
  const imoveis = [
    {
      id: 1,
      titulo: 'Apartamento em São Paulo',
      descricao: 'Apartamento com 2 quartos e 1 banheiro.',
      preco: 300000,
      imagem: 'https://picsum.photos/150',
    },
    {
      id: 2,
      titulo: 'Casa em Curitiba',
      descricao: 'Casa com 3 quartos e 2 banheiros.',
      preco: 500000,
      imagem: 'https://picsum.photos/151',
    },
    {
      id: 3,
      titulo: 'Cobertura em Rio de Janeiro',
      descricao: 'Cobertura com vista para o mar.',
      preco: 1000000,
      imagem: 'https://picsum.photos/152',
    },
  ];

  return (
    <div>
      <h1>Imóveis Disponíveis</h1>
      <div className="display-grid gap-2rem">
        {imoveis.map(imovel => (
          <ImovelCard key={imovel.id} imovel={imovel} />
        ))}
        {imoveis.map(imovel => (
          <ImovelCard key={imovel.id} imovel={imovel} />
        ))}
        {imoveis.map(imovel => (
          <ImovelCard key={imovel.id} imovel={imovel} />
        ))}
      </div>
    </div>
  );
}
