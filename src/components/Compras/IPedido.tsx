export default interface Pedido {
    comprador: {id: number, name: string, email: string, senha: string, role: string};
    concluido: boolean;
    fornecedor: {id: number, name: string, cnpj: string, type: number, email: string};
    id: number;
    items: [{id: number, produto: string, quantidade: number, valorTotal: number}]
  }