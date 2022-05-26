import { prePathUrl } from "../components/CommonFunctions";

export default async function loadSvg(url) {
    const jsonData = await fetch(prePathUrl() + 'images/' + url)
        .then((data) => {
            return data;
        })
    return jsonData
}
