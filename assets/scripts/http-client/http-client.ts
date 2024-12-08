interface RequestParam {
    queryMap?: Record<string, string>;
    headers?: Record<string, string>;
    body?: any;
}

export class HttpClient {
    baseUrl: string;
    headers: Record<string, string>;
    onRequestBefore: (xhr: XMLHttpRequest) => void;
    onRequestAfter: (xhr: XMLHttpRequest) => void;

    setOnRequestBefore(callback: (xhr: XMLHttpRequest) => void) {
        this.onRequestBefore = callback;
    }

    setOnRequestAfter(callback: (xhr: XMLHttpRequest) => void) {
        this.onRequestAfter = callback;
    }

    sendRequest<T>(path: string, method: "GET" | "POST", param: RequestParam): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            let paramsString = param.queryMap ? "?" + new URLSearchParams(param.queryMap) : "";
            xhr.open(method, this.baseUrl + path + paramsString);
            xhr.setRequestHeader("Content-Type", "application/json");

            // set headers
            if (this.headers) {
                for (let key in this.headers) {
                    xhr.setRequestHeader(key, this.headers[key]);
                }
            }

            if (param.headers) {
                for (let key in param.headers) {
                    xhr.setRequestHeader(key, param.headers[key]);
                }
            }
            if (this.onRequestBefore) {
                this.onRequestBefore(xhr);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (this.onRequestAfter) {
                        this.onRequestAfter(xhr);
                    }
                    if (xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                }
            };

            if (param.body) {
                xhr.send(JSON.stringify(param.body));
            } else {
                xhr.send();
            }
        });
    }

    get<T>(path: string, param: RequestParam): Promise<T> {
        return this.sendRequest(path, "GET", param)
    }

    post<T>(path: string, param: RequestParam): Promise<T> {
        return this.sendRequest(path, "POST", param)
    }
}




