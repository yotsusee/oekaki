source "https://rubygems.org"

ruby "3.4.2"

# 消す候補
gem "bootsnap", require: false

# --- Rails 本体 ---
gem "rails", "~> 8.1.3"          # Rails 8 本体

# --- アセット / フロントエンド ---
gem "propshaft"                  # Rails 8 の新アセットパイプライン（Sprocketsの後継）
gem "importmap-rails"            # JS を importmap で管理（npm不要）
gem "turbo-rails"                # Turbo（SPA的な高速ページ遷移）
gem "stimulus-rails"             # Stimulus（軽量JSフレームワーク）

# --- DB / サーバー ---
gem "pg", "~> 1.1"               # PostgreSQL 用アダプタ
gem "puma", ">= 5.0"             # Rails 標準の Web サーバー

# --- API / JSON ---
gem "jbuilder"                   # JSON API を簡単に構築

# --- キャッシュ / ジョブ / Cable（Rails 8 標準の Solid 系） ---
gem "solid_cache"                # DB バックエンドのキャッシュ
gem "solid_queue"                # DB バックエンドの ActiveJob
gem "solid_cable"                # DB バックエンドの ActionCable

# --- 画像処理 ---
gem "image_processing", "~> 1.2" # ActiveStorage の画像変換

# --- 認証 / アップロード / 表示ロジック ---
gem "bcrypt"                     # has_secure_password 用（認証）
gem "carrierwave", "~> 3.1.4"    # 画像アップロード
gem "draper"                     # View のロジックを Decorator に分離
gem "rails-i18n"                 # 日本語化（ja.yml）

# --- 開発・テスト ---
group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"  # デバッガ
  gem "bundler-audit", require: false                                # 脆弱性チェック
  gem "brakeman", require: false                                     # セキュリティ静的解析
  gem "rubocop-rails-omakase", require: false                        # Rails 推奨の RuboCop 設定

  gem "pry-byebug"                                                   # デバッグ（pry + byebug）
  gem "factory_bot_rails"                                            # テストデータ生成
  gem "faker"                                                        # ダミーデータ生成
  gem "rspec-rails"                                                  # RSpec（Rails テストの定番）
  gem "annotate"                                                     # モデルに schema 情報を自動付与
end

group :test do
  gem "capybara"                 # E2E テスト（ブラウザ操作）
  gem "selenium-webdriver"       # Capybara のブラウザドライバ
end
