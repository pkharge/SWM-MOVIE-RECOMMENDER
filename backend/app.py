from flask import Flask, flash, request, jsonify, redirect, url_for, render_template
import pandas as pd

app = Flask(__name__)
app.config["Debug"] = True

matric_factorization_df = pd.read_csv('./file2.csv')
knn_df = pd.read_csv('./file1.csv')
dff = pd.read_csv("./images_url.csv", encoding = "ISO-8859-1")

@app.route('/fetch_recommend', methods=['GET'])
def fetch_recommendation():

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
                for y in data2:
                    if str(x) in y:
                        print([y[0], y[1]])
                        matrix_send_data.append([y[0], y[1]])
            for x in knn_data:
                for y in data2:
                    if str(x) in y:
                        print([y[0], y[1]])
                        knn_send_data.append([y[0], y[1]])
            
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
