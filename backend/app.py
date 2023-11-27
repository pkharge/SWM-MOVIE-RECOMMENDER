import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["Debug"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
matric_factorization_df = pd.read_csv('./file2.csv')
knn_df = pd.read_csv('./file1.csv')
dff = pd.read_csv("./images_url.csv", encoding = "ISO-8859-1")

@app.route('/movies', methods=['GET'])
def fetch_recommendations():

    try:
        # Get user_id from query parameters
        user_id = int(request.args.get('user_id'))        

        if 0 < user_id <611:
            matrix_data = list(matric_factorization_df.iloc[user_id-1])
            knn_data = list(knn_df.iloc[user_id-1])
            data2 = dff.values.tolist()

            matrix_send_data = []
            knn_send_data = []

            for x in matrix_data:
                image_found = False
                for y in data2:
                    if str(x) in y:
                        image_found = True
                        print([y[0], y[1]])
                        matrix_send_data.append([y[0], y[1]])
                        break
                if not image_found:
                    matrix_send_data.append([str(x), "no-image.jpeg"])
                
            for x in knn_data:
                image_found = False
                for y in data2:
                    if str(x) in y:
                        image_found = True
                        print([y[0], y[1]])
                        knn_send_data.append([y[0], y[1]])
                        break
                if not image_found:
                    knn_send_data.append([str(x), "no-image.jpeg"])
            knn_send_data = sorted(knn_send_data)
            matrix_send_data = sorted(matrix_send_data)
            user_movies = {
                "matrix_fact": matrix_send_data,
                "knn": knn_send_data
            }
            return jsonify(user_movies)
        else:
            raise UserIDException(user_id)
    except UserIDException as e:
        return "Please enter a userid between 1 and 610, your userid was: " + str(e.value)


class UserIDException(Exception):
    def __init__(self, value):
        self.value = value
  
    # __str__ is to print() the value
    def __str__(self):
        return(repr(self.value))

app.run()
