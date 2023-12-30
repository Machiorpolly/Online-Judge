import subprocess
import sys
import time

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def run_py_program(program, input_file, output_file, timeout_seconds):
    py_command = ["python3", "./" + program]

    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        try:
            start_time = time.time()
            result = subprocess.run(py_command, stdin=infile, stdout=outfile, stderr=subprocess.PIPE, timeout=timeout_seconds)
            result.check_returncode()
            end_time = time.time()

            runtime = end_time - start_time
            print(f"{runtime:.2f}", end=" ")

        except subprocess.TimeoutExpired:
            eprint("Time Limit Expired")
            subprocess.run(["pkill", "-f", program])
            return "tle"
        except subprocess.CalledProcessError as error:
            eprint("Program exited with exit code: " + str(error.returncode))
            return "re"

def compare_files(file1, file2):
    try:
        with open(file1, 'r') as f1, open(file2, 'r') as f2:

            content1 = f1.read()
            content2 = f2.read()
            content1 = content1.rstrip('\n')

            if content1 == content2:
                print("ac", end="")
            else:
                print("wa", end="")

    except FileNotFoundError:
        eprint("Error: One or both files not found.")

if __name__ == "__main__":
    if len(sys.argv) != 6:
        print("Usage: python3 runPython.py <program_name> <input_file> <output_file> <correctOutput> <timeout_seconds>")
        sys.exit(1)

    program = sys.argv[1]
    input_file = sys.argv[2]
    output_file = sys.argv[3]
    correct_output = sys.argv[4]
    time_limit = 2 * (int(sys.argv[5]))

    status = run_py_program(program, input_file, output_file, time_limit)
    if status != "re":
        compare_files(output_file, correct_output)
    else:
        print("0 re", end="")

    

