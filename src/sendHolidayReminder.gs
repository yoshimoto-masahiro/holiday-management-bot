/**
 * 休日管理表の記入リマインダー通知スクリプト
 * 実行条件: 毎月 第2・第4金曜日
 */
function sendHolidayReminder() {
  // ==================================================
  // ▼ 設定エリア
  // ==================================================
  
  // 1. Google ChatのWebhook URL（スクリプトプロパティから取得）
  // 必ずスクリプトプロパティ（WEBHOOK_URL）を設定してください。
  const WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
  
  // 2. カレンダーのあるスプレッドシートのURL（通知のリンク用）
  //SHEET_URL <- 通知用のリンク先URLを貼り付けてください。 
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/********************************************/edit'; 

  // スクリプトプロパティ未設定時のガード処理
  if (!WEBHOOK_URL) {
    console.error("エラー: スクリプトプロパティ 'WEBHOOK_URL' が設定されていないか取得できません。");
    return;
  }

  // ==================================================
  // ▲ 設定はここまで
  // ==================================================

  const today = new Date();
  const date = today.getDate(); // 日にち (1-31)
  const day = today.getDay();   // 曜日 (0=日, 1=月, ... 5=金, 6=土)

  // ■ 判定ロジック
  // 第2金曜日 = 8日〜14日の間の金曜日
  // 第4金曜日 = 22日〜28日の間の金曜日
  const isSecondWeek = (date >= 8 && date <= 14);
  const isFourthWeek = (date >= 22 && date <= 28);
  const isFriday = (day === 5);

  // 金曜日、かつ「第2週」または「第4週」の場合のみ実行
  if (isFriday && (isSecondWeek || isFourthWeek)) {
    postToChat(WEBHOOK_URL, SHEET_URL);
  } else {
    // ログで動作確認用
    console.log(`今日は送信対象日ではありません。(日付: ${date}日, 曜日ID: ${day})`);
  }
}

/**
 * Google Chatへの通知送信処理
 * @param {string} webhookUrl 
 * @param {string} sheetUrl 
 */
function postToChat(webhookUrl, sheetUrl) {
  const message = {
    "text": "📢*【アナウンス】休日管理表の記入確認*\n\n運営日に向けて、休日の予定記入をお願いします。\n※記載ルールに則って調整をお願いします。\n\n<" + sheetUrl + "|📅👉 シートを開く>"
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(message)
  };

  try {
    UrlFetchApp.fetch(webhookUrl, options);
    console.log("チャットへ送信しました。");
  } catch (e) {
    console.log("送信エラー: " + e.toString());
  }
