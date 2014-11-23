# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  list_id     :integer          not null
#  description :text
#  ord         :float            default(0.0)
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  belongs_to :list
  has_many :items, dependent: :destroy
  has_many :card_assignments, dependent: :destroy

  default_scope { order(:ord) }

  def self.sort_by!(arr, list_id)
    #arr contains id of the cards
    ord = 0
    p "HERE IS ARRAY" + arr.to_s

    arr.each do |id|
      if card = Card.find(id)
        #if card is found
        if card.list_id != list_id
          card.list_id = list_id
        end
        card.ord = ord
        card.save!
        ord+= 1
      end
    end
  end


end
