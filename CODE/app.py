import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["Debug"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

data_matrix_factor_method = pd.read_csv('./recommend_matrix.csv')
data_knn_method = pd.read_csv('./recommend_knn.csv')
data_ui_image_url = pd.read_csv("./ui_images.csv", encoding = "ISO-8859-1")

@app.route('/movies', methods=['GET'])
def fetch_recommendations():
    try:
        # Get user_id from query parameters
        user_id = int(request.args.get('user_id'))        

        if 0 < user_id < 500:
            data_matrix_factor_list = list(data_matrix_factor_method.iloc[user_id-1])
            data_knn_list = list(data_knn_method.iloc[user_id-1])
            data_ui_image_url_list = data_ui_image_url.values.tolist()

            data_matrix_factor_json_list = []
            data_knn_json_list = []

            for recommends in data_matrix_factor_list:
                image_found = False
                for images in data_ui_image_url_list:
                    if str(recommends) in images:
                        image_found = True
                        print([images[0], images[1], images[2]])
                        data_matrix_factor_json_list.append([images[0], images[1], images[2]])
                        break
                if not image_found:
                    data_matrix_factor_json_list.append([str(recommends), "no-image.jpeg"])
                
            for recommends in data_knn_list:
                image_found = False
                for images in data_ui_image_url_list:
                    if str(recommends) in images:
                        image_found = True
                        print([images[0], images[1], images[2]])
                        data_knn_json_list.append([images[0], images[1], images[2]])
                        break
                if not image_found:
                    data_knn_json_list.append([str(recommends), "no-image.jpeg"])

            data_knn_json_list = sorted(data_knn_json_list)
            data_matrix_factor_json_list = sorted(data_matrix_factor_json_list)

            user_movies = {
                "matrix_fact": data_matrix_factor_json_list,
                "knn": data_knn_json_list
            }

            return jsonify(user_movies)
        else:
            raise UserIDException(user_id)
    except UserIDException as e:
        return "User ID must be between 1 to 500. Invalid User ID: " + str(e.value)


class UserIDException(Exception):
    def __init__(self, value):
        self.value = value
  
    # __str__ is to print() the value
    def __str__(self):
        return(repr(self.value))

app.run()
