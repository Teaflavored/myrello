class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new]

  def new; end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end


  private

  def redirect_if_logged_in
    redirect_to root_url if signed_in?
  end
end
