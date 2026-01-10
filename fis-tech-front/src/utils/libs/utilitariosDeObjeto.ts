/**
 * Remove valores nulos, indefinidos ou strings vazias do objeto passado.
 * @param objeto O objeto que será modificado in-place.
 * @returns O objeto original, sem os valores nulos, indefinidos ou strings vazias.
 */
export const removerValoresNulosIndefinidosOuVazios = <T extends object>(
  objeto: T
): T => {
  for (const chave in objeto) {
    const valor = objeto[chave];
    if (valor === null || valor === undefined || valor === "") {
      delete objeto[chave];
    }
  }
  return objeto;
};
