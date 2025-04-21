import { useState } from "react";

// モックユーザーデータ
const MOCK_USERS = {
  1: {
    id: 1,
    name: "鈴木一郎",
    username: "suzuki123",
    email: "suzuki@example.com",
    phone: "090-1234-5678",
    website: "suzuki.example.com",
    address: {
      street: "桜木町1-2-3",
      suite: "マンション101",
      city: "東京都",
      zipcode: "100-0001",
    },
    company: {
      name: "鈴木株式会社",
      catchPhrase: "次世代のイノベーションを創造する",
    },
  },
  // 他のユーザーも同様に省略
};

// モックの非同期データ取得関数
const mockFetchUser = (id) => {
  console.log(`Fetching user with ID: ${id}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_USERS[id]) {
        console.log("User found:", MOCK_USERS[id]);
        resolve(MOCK_USERS[id]);
      } else {
        console.error("User not found");
        reject(new Error("ユーザーが見つかりませんでした"));
      }
    }, 1000); // 1秒の遅延を設定
  });
};

export default function UserFetcher() {
  const [inputValue, setInputValue] = useState("1");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTime, setFetchTime] = useState(null);

  // ユーザーデータを取得する関数
  const fetchUserData = async (id) => {
    // 状態をリセット
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const startTime = new Date();
      // モックAPIからデータを取得
      const data = await mockFetchUser(id);
      const endTime = new Date();
      setFetchTime(endTime - startTime);

      setUserData(data);
    } catch (err) {
      setError(`ユーザー情報の取得に失敗しました: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedValue = parseInt(inputValue, 10);

    // 入力値が範囲外の場合のエラーチェック
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 5) {
      setError("ユーザーIDは1～5の範囲内で指定してください");
      return;
    }
    // ボタンが押されたときに直接fetchUserData関数を呼び出し
    fetchUserData(parsedValue);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", backgroundColor: "#f0f9f9", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#005f73" }}>ユーザー情報取得</h2>

      {/* 検索フォーム */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ユーザーID（1-5）"
            style={{ flex: "1", padding: "10px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px", outline: "none" }}
            min="1"
            max="5"
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", backgroundColor: "#0a9396", color: "white", border: "none", borderRadius: "0 5px 5px 0", cursor: "pointer" }}
          >
            取得
          </button>
        </div>
        <p style={{ fontSize: "12px", color: "#005f73" }}>※ 有効なIDは1～5です</p>
      </form>

      {/* ローディング表示 */}
      {loading && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #ccc", borderTop: "4px solid #0a9396", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        </div>
      )}

      {/* エラーメッセージ */}
      {error && (
        <div style={{ padding: "10px", marginBottom: "20px", backgroundColor: "#ffe5e5", color: "#d00000", borderRadius: "5px", border: "1px solid #ffcccc" }}>
          {error}
        </div>
      )}

      {/* ユーザー情報表示 */}
      {userData && (
        <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#005f73" }}>{userData.name}</h3>
          <p><strong>ユーザー名:</strong> {userData.username}</p>
          <p><strong>メール:</strong> {userData.email}</p>
          <p><strong>電話:</strong> {userData.phone}</p>
          <p><strong>ウェブサイト:</strong> {userData.website}</p>

          <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #ccc" }}>
            <h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>住所:</h4>
            <p>{userData.address.street}, {userData.address.suite}</p>
            <p>{userData.address.city}, {userData.address.zipcode}</p>
          </div>

          <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #ccc" }}>
            <h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>会社:</h4>
            <p>{userData.company.name}</p>
            <p style={{ fontSize: "14px", color: "#555" }}>{userData.company.catchPhrase}</p>
          </div>

          {/* 取得情報 */}
          {fetchTime && (
            <p style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
              取得時間: {fetchTime}ms
            </p>
          )}
        </div>
      )}
    </div>
  );
}