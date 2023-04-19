import Cookies from "js-cookie";

type CookieKey = "br-session" | "tenant-id";

class CookieService {
  public getCookie(key: CookieKey) {
    return Cookies.get(key);
  }

  public setCookie(key: CookieKey, value: string) {
    return Cookies.set(key, value);
  }

  public removeCookie(key: CookieKey) {
    Cookies.remove(key);
  }
}

export default new CookieService();
