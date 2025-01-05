from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import RegisterUser
import cloudinary.uploader
import base64
import io
import requests  

@api_view(['POST'])
def register_user(request):
    try:
        username = request.data.get('username')
        user_picture = request.data.get('user_picture')

        base64_data = user_picture.split(',')[1]

        image_data = base64.b64decode(base64_data)

        image_file = io.BytesIO(image_data)

        upload_result = cloudinary.uploader.upload(image_file, folder='users_pic', resource_type="image")

        users_pic_path = upload_result['public_id']

        RegisterUser.objects.create(
            username=username,
            faceID=users_pic_path,
            password="12345"
        )

        return Response({
            "message": "User created successfully",
            "data": {
                "username": username,
                "user_picture": user_picture
            }
        }, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(['POST'])
def login_user(request):
    try:
        username = request.data.get('username')
        faceID = request.data.get('user_picture')
        base64_data = faceID.split(',')[1]

        image_data = base64.b64decode(base64_data)

        image_file = io.BytesIO(image_data)

        try:
            user = RegisterUser.objects.get(username=username)
        except RegisterUser.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        cloudinary_image_url = f"https://res.cloudinary.com/fishfollowers/image/upload/v1736075054/{user.faceID}"

        response = requests.post(
            "https://api-us.faceplusplus.com/facepp/v3/compare",
            data={
                'api_key': "B3GK9HPjHHVS2EaEUqZxmuJY6OS9QGND",
                'api_secret': "5gyqMIVAvsNNuNQBgaQrp3_-VLqcCAPL",
                'image_url1': cloudinary_image_url,  
                
            },
            files={
            'image_file2': image_file, 
            }
        )
        result = response.json()

        
        if response.status_code == 200:
            matched_image_str = result.get("confidence")
            matched_image_float = float(matched_image_str)
            if matched_image_float > 70:
                return Response({"matched_image": "true"}, status=201)
            else:
                return Response({"matched_image": "false"}, status=201)
            
        else:
            return Response ({"Error":result}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
