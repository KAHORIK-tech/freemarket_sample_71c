<img width="600px" alt="c77d16e6c31d78fb5ade1d7e6feb9a9f" src="https://user-images.githubusercontent.com/63528317/88456482-14b68900-ceb9-11ea-9f88-53def61425d7.jpg">

# App Title
Freemarket_sample_71c

# Description
TechCamp 71期夜間・休日コース groupCの最終課題になります。  
メルカリ等を参考にして、フリマアプリのクローンサイトを作成しました。

# Production
実際に[こちら](http://54.250.23.227/)からご使用いただけます。  
※ セキュリティーの観点から個人情報は登録しないでください  
※ アカウントは以下のものをご使用ください  
  
■ **ベーシック認証**  
  id: admin  
  password: 2222  
■ **出品用アカウント**  
  ログイン画面の 「簡単ログイン(出品者)」 ボタンからログインしてください  
■ **購入用アカウント**  
  ログイン画面の 「簡単ログイン(購入者)」 ボタンからログインしてください  
■ **クレジットカード情報**  
  [テストカード](https://pay.jp/docs/testcard)の中から選択    
  (有効期限は今月以降に設定 / cvcは３桁の任意の数字)

# Features
- **ログイン機能**  
  ウィザード形式での情報登録  
  SNSのAPIを利用したログイン  
  
- **商品出品機能**  
  画像の複数枚登録  
  レビューの表示  
  動的なカテゴリー選択ボックス  
  DBを使用しない選択ボックス  
    
- **編集機能**  
  複数枚の画像登録  
  動的なカテゴリー選択ボックス  
- **商品詳細表示**  
  商品ステータスに応じたボタン表示の切り替え  
- **コメント機能**  
  非同期のコメント表示  
  出品者には出品者ラベルを表示  
- **いいね機能**  
  非同期のいいね！付け替え  
  クリック時のアニメーション表示  
- **商品購入機能**  
  カード情報の確認・変更ページへ  
  条件が整った時のみ購入確定へ進める  
  売上情報・顧客情報をpayjpにて管理  
- **クレジットカード登録**  
  Payjpを用いたカード情報の登録（カード情報のトークン化）
- **商品削除機能**  
  モーダルウィンドウを利用して削除するか確認する  
- **商品詳細検索機能**  
  ソート機能  
  スペース区切りのキーワード検索  
  動的なカテゴリー選択ボックス  
  全選択全解除のチェックボックス  
- **パンくず機能**  
  gem'gretel'を利用してパンくずリストを表示  
- **売り切れ表示機能**  
  販売済みの商品にSoldoutバナーを表示  
- **マイページ機能**  
  activeクラスを用いたスタイルの付替  
  hover時のスタイルの付替  
  非同期でのタブ切り替え  

# Demo

#### 出品機能
<img width="600px" alt="c4bf7c14cd6af0a02f7d7f8bcdb28986" src="https://user-images.githubusercontent.com/63528317/88456529-58a98e00-ceb9-11ea-91ef-8d11e23d4113.gif">

#### 検索機能
<img width="600px" alt="ce5dcfd87bc3017af9d132317b73a00b" src="https://user-images.githubusercontent.com/63528317/88456585-90183a80-ceb9-11ea-82ab-25707334d907.gif">


#### 商品詳細ページ
<img width="600px" alt="211003fb53c6b3109521145af05b38a0" src="https://user-images.githubusercontent.com/63528317/88456636-1cc2f880-ceba-11ea-8ad8-57cb59ffb841.gif">

#### 購入機能
<img width="600px" alt="ddb1a0e04c1e2a00a5c14544127610ba (2)" src="https://user-images.githubusercontent.com/63528317/88456682-8ba05180-ceba-11ea-8f0a-5a2972c27c03.gif">


#### 「いいね」機能・コメント機能
<img width="600px" alt="e12fa65d356ff18534bb458fe52a2ccd" src="https://user-images.githubusercontent.com/63528317/88456696-c3a79480-ceba-11ea-8621-cdae0953b5b2.gif">


# Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|default: ""|
|email|string|null: false, unique: true|default: ""|
|encrypted_password|string|null: false|
|family_name|string|null: false|
|first_name|string|null: false|
|family_name_kana|string|
|first_name_kana|string|
|birthday|date|
### Association
- has_one :shipping_address, dependent: :destroy
- has_one :card, dependent: :destroy
- has_many :sns_credentials, dependent: :destroy
- has_many :items, dependent: :destroy
- has_many :seller_items, class_name: 'Item', :foreign_key => 'seller_id'
- has_many :buyer_items, class_name: 'Item', :foreign_key => 'buyer_id'
- has_many :items, dependent: :destroy
- has_many :comments, dependent: :destroy
- has_many :likes, dependent: :destroy
- has_many :items, through: :likes

## shipping_addressesテーブル
|Column|Type|Options|
|------|----|-------|
|family_name|string|null: false|
|first_name|string|null: false|
|family_name_kana|string|null: false|
|first_name_kana|string|null: false|
|post_code|string|null: false|
|prefecture|string|null:false|
|city|string|null:false|
|block|string|null:false|
|building|string||
|phone_number|string||
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user, optional: true

## cardsテーブル
|Column|Type|Options|
|------|----|-------|
|customer_token|string|null: false|
|user|references|forign_key: true|
### Association
- belongs_to :user, optional: true

## sns_credentialsテーブル
|Column|Type|Options|
|------|----|-------|
|uid|string||
|provider|string||
|user|references|foreign_key: true|
### Association
- belongs_to :user, optional: true

## itemsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|description|text|null: false|
|category|references|null: false|
|condition|references|null: false|
|postage|references|null: false|
|prefecture|references|null: false|
|preparation_period|references|null: false|
|price|integer|null: false|
|user|references|null: false, foreign_key: true|
|shipping_method|references|null: false|
|seller|references|foreign_key: {to_table: :users}|
|buyer|references|foreign_key: {to_table: :users}|

### Association
- has_many :users, through: :likes
- belongs_to :seller, class_name: "User", :foreign_key => 'seller_id'
- belongs_to :buyer, class_name: "User", :foreign_key => 'buyer_id', optional: true
- belongs_to :category
- has_many :item_images dependent: :destroy
- has_many :comments dependent: :destroy
- has_many :likes dependent: :destroy
- belongs_to_active_hash :condition
- belongs_to_active_hash :postage
- belongs_to_active_hash :prefecture
- belongs_to_active_hash :preparation_period
- belongs_to_active_hash :shipping_method

## item_imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to :item

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|ancestry|string||
### Association
- has_many :items
- has_ancestry

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|user|references|null: false, foreign_key: true|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item

## likesテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item
