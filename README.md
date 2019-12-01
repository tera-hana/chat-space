## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|g
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups,  through:  :groups_users

### index 
- email

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text|null: true|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users

### index
- user_id
- group_id

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users,  through:  :groups_users

### index
- 

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

### index
- user_id
- group_id