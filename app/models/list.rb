# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  board_id   :integer          not null
#  ord        :float            default(0.0)
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base
  validates :title, :board, :ord, presence: true

  belongs_to :board
  has_many :cards, dependent: :destroy

  default_scope { order(:ord) }


  def self.sort_by!(arr)
    ord = 0
    arr.each do |id|
      if list = List.find(id)
        p list
        list.ord = ord
        list.save!
        ord+= 1
      end
    end
  end
  # TODO: class method for updating orders?
end
