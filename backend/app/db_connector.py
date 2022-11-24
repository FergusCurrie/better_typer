import sqlite3

DB = "../db"


def query_db(query):
    result = None
    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute(query)
        con.commit()
        result = cursor.fetchall()
        cursor.close()
    except sqlite3.Error as error:
        print("Error while connecting to sqlite.")
        print(error)
    return result


def get_records():
    query = "select * from logs;"
    result = query_db(query)
    return result


def add_record(array):
    """
    add a row to database
    array = [uuid, input, datetime, test]
    """
    assert len(array) == 4
    query = f"""insert into logs(uuid,input,datetime,test) 
        values('{array[0]}', '{array[1]}', '{array[2]}', '{array[3]}');
    """
    query_db(query)


def create_table():
    query = """
        create table logs(
            uuid type text,
            input type text,
            datetime type text,
            test type text
        );
    """
    query_db(query)
