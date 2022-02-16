// Buscar os Links já salvos no LocalStorage
export async function getLinksSave(key) {
    // chave única para cada link
    //getItem vai pegar
    const myLinks = await localStorage.getItem(key)

    // INICIA a array de links como vazio caso n tenha nenhum link salvo.
    // Caso tenha algum link, ele vai pegar o que está salvo e mandar para a variavel.
    let linksSaves = JSON.parse(myLinks) || [];
    
    return linksSaves;
}


// Salvar os Links no LocalStorage
export async function saveLink(key, newLink) {
    let linksStored = await getLinksSave(key);

    // não deixar salvar caso já tenha um link com ID salvo, ou seja,
    // não deixar salvar links repetidos.
    const hasLink = linksStored.some(link => link.id === newLink.id)

    if (hasLink) {
        console.log('Esse link já existe na sua lista!');
        return;
    }

    // Adicionar o novo link ao array de links
    linksStored.push(newLink);
    //setItem vai adicionar/salvar dentro da chave.
    await localStorage.setItem(key, JSON.stringify(linksStored));
    console.log('Link salvo com sucesso!');
}


// Remover os Links já salvos
export function deleteLink(links, id) {

    let myLinks = links.filter(item => {
        // vai retornar todos os links que são diferentes do que foi clicado
        // que será removido.
        return (item.id !== id)
    });

    localStorage.setItem('@encurtaLink', JSON.stringify(myLinks));
    return myLinks;

}
