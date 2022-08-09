<?php
 namespace App\Http\Controllers;
//  use Illuminate\Http\Request;
//  use Validator,Redirect,Response,File;
//  use Illuminate\Foundation\Auth\AuthenticatesUsers;
//  use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class SocialController extends Controller{

    public function redirect(){
        return Socialite::driver('facebook')->redirect();
    }

    public function callback(){
        $userSocial = Socialite::driver('facebook')->stateless()->user(); 
        $findUser = User::where('fb_id', $userSocial->id)->first();
       
        if($findUser){

            $userToken = $findUser->createToken('accessToken')->accessToken;
            $findUser->accessToken = $userToken;
            //If user has no nickname
            if($findUser->nickname === null || $findUser->nickname === ''){
                //genrate one and update
                $nName = substr($findUser->firstname, 0, 1).$findUser->lastname;

                // is this nickname exist?
                $nicknameExists = User::where('nickname', $nName)->first();
                if($nicknameExists){
                    $nName = $nName.$findUser->id;
                }

                $findUser->nickname = $nName;
            }                
            
            $findUser->save();
            auth()->login($findUser, true);

            return redirect('/');
        } else {
            $pass = bcrypt(7007007);
            $name = $userSocial->name;
            $name = explode(" ",$name);
            $nameLen = count($name);
            
            if($nameLen == 2){
                $fName = $name[0];
                $lName = $name[1];
                $oName = "";
            } else {
                $fName = $name[0];
                $lName = $name[2];
                $oName = $name[1];
            }     
               
            
            $user = User::create([
                'fb_id' => $userSocial->id,
                'firstname'     => $fName,
                'lastname'     => $lName,
                'othername'     => $oName,
                'nickname' => $userSocial->nickname,
                'email'    => $userSocial->email,
                'fb_token' => $userSocial->token,
                'profilePicUrl' => $userSocial->getAvatar(),
                'password' => $pass,
            ]);

            if($user){
                $userToken = $user->createToken('accessToken')->accessToken;
                $user->accessToken = $userToken;

                //If user has no nickname
                if($user->nickname === null || $user->nickname === ''){
                    //genrate one and update
                    $nName = substr($user->firstname, 0, 1).$user->lastname;

                    // is this nickname exist?
                    $nicknameExists = User::where('nickname', $nName)->first();
                    if($nicknameExists){
                        $nName = $nName.$user->id;
                    }

                    $user->nickname = $nName;
                }   

                $user->save();
                auth()->login($user, true);

                return redirect('/');
                   
            }
        }
        
    }

    
    public function logout(){
        Auth::logout();
        Session::flush();
        Session::regenerate();
        return redirect('/');
    }
}