import requests
import json
import os
import time
class logg:
    default_file='./log/log.txt'
    def __init__(self,href):
        self.href=href
        try:
            self.file=open(self.href,'a' if os.path.exists(self.href) else 'w')
        except:
            self.href=self.default_file
            self.file=open(self.href,'a' if os.path.exists(self.href) else 'w')
        self('--start log')
        self.time()
    def print(self,string=None,*strings):
        if string!=None:
            print(string)
        if strings:
            for i in strings:
                print(i)
    def __call__(self,string=None,*strings):
        if string!=None:
            print(string)
            self.file.write(str(string)+'\n')
        if strings:
            for i in strings:
                print(i)
                self.file.write(str(i)+'\n')
    def time(self):
        now=time.localtime(time.time())
        self(time.strftime("%Y-%m-%d  %H:%M:%S",now))
    def __del__(self):
        self('--end log')
        self.time()
        self.file.close()
    def info(self,string=None,*strings):
        self("--info--")
        self(string,*strings)
    def warn(self,string=None,*strings):
        self("--warn--")
        self(string,*strings)
    def error(self,string=None,*strings):
        self("--error--")
        self(string,*strings)