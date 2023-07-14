import axios from "axios";

const get = async (url) => {
    return await axios
        .get(url)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        });
}

const post = async (url, payload) => {
    return await axios
        .post(url, payload)
        .then(() => {
            return true
        })
        .catch((err) => {
            console.log(err);
        });
}

const put = async (url, payload) => {
    return await axios
        .put(url, payload)
        .then(() => {
            return true
        })
        .catch((err) => {
            console.log(err);
        });
}

const deleteItem = async (url, payload) => {
    return await axios
        .delete(url, payload)
        .then(() => {
            return true
        })
        .catch((err) => {
            console.log(err);
        });
}

export { get, post, put, deleteItem }