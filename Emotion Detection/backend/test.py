# import pandas as pd
# from wordcloud import WordCloud
# import seaborn as sns
# import re
# import string
# from collections import Counter, defaultdict

# from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

# import plotly.express as px
# from plotly.subplots import make_subplots
# import plotly.graph_objects as go
# from plotly.offline import plot

# import matplotlib.gridspec as gridspec
# from matplotlib.ticker import MaxNLocator
# import matplotlib.patches as mpatches
# import matplotlib.pyplot as plt

# ##################################
# import warnings
# warnings.filterwarnings('ignore')

# ##################################
# import nltk
# nltk.download('stopwords')
# from nltk.corpus import stopwords
# stopWords_nltk = set(stopwords.words('english'))

# ##################################
# from transformers import BertTokenizer
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', 
#                                           do_lower_case=True)

# ###################################
# title_ = ["negative", "neutral", "positive"]

# ##################################
# import pandas as pd
# import numpy as np
# import os
# import random
# from pathlib import Path
# import json

# ###################################
# import torch
# from tqdm.notebook import tqdm

# from transformers import BertTokenizer
# from torch.utils.data import TensorDataset

# from transformers import BertForSequenceClassification

# #####################################
# class Config():
#     seed_val = 17
#     device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
#     epochs = 5 
#     batch_size = 6
#     seq_length = 512
#     lr = 2e-5
#     eps = 1e-8
#     pretrained_model = 'bert-base-uncased'
#     test_size=0.15
#     random_state=42
#     add_special_tokens=True 
#     return_attention_mask=True 
#     pad_to_max_length=True 
#     do_lower_case=False
#     return_tensors='pt'

# config = Config()

# ######################################
# # params will be saved after training
# params = {"seed_val": config.seed_val,
#     "device":str(config.device),
#     "epochs":config.epochs, 
#     "batch_size":config.batch_size,
#     "seq_length":config.seq_length,
#     "lr":config.lr,
#     "eps":config.eps,
#     "pretrained_model": config.pretrained_model,
#     "test_size":config.test_size,
#     "random_state":config.random_state,
#     "add_special_tokens":config.add_special_tokens,
#     "return_attention_mask":config.return_attention_mask,
#     "pad_to_max_length":config.pad_to_max_length,
#     "do_lower_case":config.do_lower_case,
#     "return_tensors":config.return_tensors,
#          }

# #######################################
# # set random seed and device
# import random

# device = config.device

# random.seed(config.seed_val)
# np.random.seed(config.seed_val)
# torch.manual_seed(config.seed_val)
# torch.cuda.manual_seed_all(config.seed_val)

# ########################################
# # create tokenizer
# tokenizer = BertTokenizer.from_pretrained(config.pretrained_model, 
#                                           do_lower_case=config.do_lower_case)

# #########################################
# model = BertForSequenceClassification.from_pretrained(config.pretrained_model,
#                                                       num_labels=3,
#                                                       output_attentions=False,
#                                                       output_hidden_states=False)

# ##########################################
# from torch.utils.data import DataLoader, RandomSampler, SequentialSampler

# #########################################
# # from transformers import AdamW, get_linear_schedule_with_warmup
# from torch.optim.adamw import AdamW

# optimizer = AdamW(model.parameters(),
#                   lr=config.lr, 
#                   eps=config.eps)

# config.device

# model.load_state_dict(torch.load(f'_BERT_epoch_3.model', map_location=torch.device('cpu')))

# pred_final = []

# #########################################

# predictions = []

# review = "I am so happy"
# encoded_data_test_single = tokenizer.batch_encode_plus(
# [review], 
# add_special_tokens=config.add_special_tokens, 
# return_attention_mask=config.return_attention_mask, 
# pad_to_max_length=config.pad_to_max_length, 
# max_length=config.seq_length,
# return_tensors=config.return_tensors
# )
# input_ids_test = encoded_data_test_single['input_ids']
# attention_masks_test = encoded_data_test_single['attention_mask']


# inputs = {'input_ids':      input_ids_test.to(device),
#           'attention_mask':attention_masks_test.to(device),
#          }

# with torch.no_grad():        
#     outputs = model(**inputs)

# logits = outputs[0]
# logits = logits.detach().cpu().numpy()
# predictions.append(logits)
# predictions = np.concatenate(predictions, axis=0)
# pred_final.append(np.argmax(predictions, axis=1).flatten()[0])

# ############################################

# print(pred_final)

# class Test:
#     def func(text):
#         pred_final = []
#         predictions = []

#         review = text
#         encoded_data_test_single = tokenizer.batch_encode_plus(
#         [review], 
#         add_special_tokens=config.add_special_tokens, 
#         return_attention_mask=config.return_attention_mask, 
#         pad_to_max_length=config.pad_to_max_length, 
#         max_length=config.seq_length,
#         return_tensors=config.return_tensors
#         )
#         input_ids_test = encoded_data_test_single['input_ids']
#         attention_masks_test = encoded_data_test_single['attention_mask']


#         inputs = {'input_ids':      input_ids_test.to(device),
#                 'attention_mask':attention_masks_test.to(device),
#                 }

#         with torch.no_grad():        
#             outputs = model(**inputs)

#         logits = outputs[0]
#         logits = logits.detach().cpu().numpy()
#         predictions.append(logits)
#         predictions = np.concatenate(predictions, axis=0)
#         pred_final.append(np.argmax(predictions, axis=1).flatten()[0])
#         label2name = {0: "Depressed",
#               1: "Normal",
#               2: "Normal"
#              }
#         return label2name[pred_final[0]]

import torch
import numpy as np
from transformers import BertTokenizer, BertForSequenceClassification

class Config:
    seed_val = 17
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    seq_length = 512
    pretrained_model = 'bert-base-uncased'
    add_special_tokens = True
    return_attention_mask = True
    pad_to_max_length = True
    do_lower_case = False
    return_tensors = 'pt'

config = Config()

tokenizer = BertTokenizer.from_pretrained(config.pretrained_model, do_lower_case=config.do_lower_case)
model = BertForSequenceClassification.from_pretrained(config.pretrained_model, num_labels=6)
# model.load_state_dict(torch.load('_BERT_epoch_3.model', map_location=torch.device('cpu')), strict=False)
model.load_state_dict(torch.load('bert_emotion_epoch_3.model', map_location=torch.device('cpu')), strict=False)
model.to(config.device)

def predict_sentiment(text):
    encoded_data = tokenizer.batch_encode_plus(
        [text],
        add_special_tokens=config.add_special_tokens,
        return_attention_mask=config.return_attention_mask,
        pad_to_max_length=config.pad_to_max_length,
        max_length=config.seq_length,
        return_tensors=config.return_tensors
    )
    input_ids = encoded_data['input_ids'].to(config.device)
    attention_mask = encoded_data['attention_mask'].to(config.device)
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
    logits = outputs[0].detach().cpu().numpy()
    pred = np.argmax(logits, axis=1).flatten()[0]
    label2name = {0: "Depressed", 1: "Joy", 2: "Love", 3: "Anger", 4: "Fear", 5: "Surprise"}
    return label2name[pred]
