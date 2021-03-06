import {
    browserHistory
} from 'react-router';

export default class Utils {

    static redirect(url) {
        browserHistory.push(url);
    }

    static getToken() {
        return sessionStorage.token;
    }

    static setToken(token) {
        sessionStorage.setItem("token", token);
    }

    static getAuthor() {
        if (this.getToken()) {
            return JSON.parse(sessionStorage.author);
        }
        return {};
    }

    static setAuthor(author) {
        if (this.getToken() && author) {
            sessionStorage.setItem("author", JSON.stringify(author));
        }
    }

    static extractUsername(name) {
        const nameComponents = name.split('__');
        if (nameComponents.length > 1) {
            let beautifiedName = "";
            nameComponents.slice(1).map((string, index) => {
                beautifiedName += index === 0 ? string : ('__' + string);
            });
            return beautifiedName;
        } else {
            return name;
        }
    }

    static handleErrors(response) {
        if (!response.ok) {
            console.log("error", response);
            throw new Error(response.statusText);
        }
        return response.json();
    };

}
