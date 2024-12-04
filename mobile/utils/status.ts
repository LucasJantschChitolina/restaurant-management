const getLabelByStatus = (status: string): string => {
  return status.replace(/_/g, ' ').charAt(0) + status.slice(1).toLowerCase();
};

const convertStatusToLabel = (status: string) => {
  if (status === "PENDING") return "Pendente";
  if (status === "IN_PROGRESS") return "Em produção";
  if (status === "CANCELLED") return "Cancelado";
  if (status === "COMPLETED") return "Pronto";
  if (status === "DELIVERED") return "Entregue";
}

const getColorByStatus = (status: string): { bg: string, text: string } => {
  switch (status) {
    case 'CANCELLED':
      return { bg: '$red4', text: '$red10' };
    case 'PENDING':
      return { bg: '$yellow4', text: '$yellow10' };
    case 'IN_PROGRESS':
      return { bg: '$blue4', text: '$blue10' };
    case 'DELIVERED':
      return { bg: '$purple4', text: '$purple10' };
    default:
      return { bg: '$green4', text: '$green10' };
  }
};

export { getLabelByStatus, getColorByStatus, convertStatusToLabel };