# 休日管理表リマインド通知 (Google Apps Script)
# holiday-management-bot

Google Chatの特定のスペースに対し、毎月第2・第4金曜日に「休日管理表」の入力リマインダーを自動送信するGASプログラムです。

---

## 概要

* **目的**: 運営日に向けた休日予定の記入漏れ防止
* **実行スケジュール**: 毎月 第2金曜日・第4金曜日
* **通知先**: Google Chat (Incoming Webhook)

---

## ファイル構成

```text
.
├── README.md
└── src/
    └── sendHolidayReminder.gs  # メイン処理スクリプト
