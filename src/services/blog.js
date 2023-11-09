export default class BlogApi {
  _baseUrl = 'https://blog.kata.academy/api';

  _token = (newToken, logOut = false) => {
    if (newToken) localStorage.setItem('token', newToken);
    if (logOut) localStorage.removeItem('token');
    return localStorage.getItem('token');
  };

  _fetch = async (url, method = 'GET', payload = null) => {
    const headers = {
      Accept: 'application/json',
    };

    const token = this._token();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (payload) headers['Content-Type'] = 'application/json';

    const request = {
      headers: headers,
      method: method,
    };
    if (payload) request.body = JSON.stringify(payload);

    const res = await fetch(`${this._baseUrl}/${url}`, request);

    try {
      const data = await res.json();
      if (data?.user?.token) this._token(data?.user?.token);

      return data;
    } catch {
      return res;
    }
  };

  articles = {
    getList: async (page = 1) => {
      const limit = 5;
      const offset = limit * (page - 1);
      let res = await this._fetch(`articles?limit=${limit}&offset=${offset}`);
      res.page = page;
      res.totalPages = Math.ceil(res.articlesCount / limit);
      return res;
    },
    addLike: async (slug) => {
      let res = await this._fetch(`articles/${slug}/favorite`, 'POST');
      return res;
    },
    removeLike: async (slug) => {
      let res = await this._fetch(`articles/${slug}/favorite`, 'DELETE');
      return res;
    },
    get: async (slug) => {
      let res = await this._fetch(`articles/${slug}`);
      return res;
    },
    create: async (data) => {
      let res = await this._fetch('articles', 'POST', { article: data });
      return res;
    },
    edit: async (slug, data) => {
      let res = await this._fetch(`articles/${slug}`, 'PUT', { article: data });
      return res;
    },
    delete: async (slug) => {
      let res = await this._fetch(`articles/${slug}`, 'DELETE');
      return res;
    },
  };

  user = {
    get: async () => {
      let res = await this._fetch('user');
      return res;
    },
    login: async (data) => {
      let res = await this._fetch('users/login', 'POST', { user: data });
      return res;
    },
    register: async (data) => {
      let res = await this._fetch('users', 'POST', { user: data });
      return res;
    },
    update: async (data) => {
      let res = await this._fetch('user', 'PUT', { user: data });
      return res;
    },
    logOut: () => {
      return this._token(null, true);
    },
  };
}
