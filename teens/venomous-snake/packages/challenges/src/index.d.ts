export { chapters } from './chapters';
export { ch01_01_hello_world, ch01_02_variables, ch01_03_math_ops, ch01_04_string_types, ch01_05_float_calculations, ch01_06_string_concatenation, ch01_07_multiple_prints, ch01_08_comments, } from './chapter01';
export { ch02_01_string_methods, ch02_02_string_indexing, ch02_03_string_slicing, ch02_04_fstrings_basics, ch02_05_input_basics, ch02_06_type_conversion, ch02_07_string_formatting, ch02_08_len_and_string_ops, } from './chapter02';
export { ch03_01_simple_if, ch03_02_if_else, ch03_03_comparison_operators, ch03_04_if_elif_else, ch03_05_logical_operators, ch03_06_nested_if, ch03_07_boolean_variables, ch03_08_complex_conditions, } from './chapter03';
export { ch04_01_simple_for_loop, ch04_02_range_basics, ch04_03_for_with_range, ch04_04_while_basics, ch04_05_while_condition, ch04_06_break_statement, ch04_07_continue_statement, ch04_08_nested_loops, ch04_09_loop_accumulator, ch04_10_for_enumerate, } from './chapter04';
export { ch05_01_simple_function, ch05_02_function_return, ch05_03_multiple_parameters, ch05_04_default_parameters, ch05_05_return_multiple, ch05_06_functions_calling_functions, ch05_07_scope, ch05_08_args, ch05_09_kwargs, ch05_10_lambda, } from './chapter05';
export { ch06_01_create_list, ch06_02_list_methods, ch06_03_list_slicing, ch06_04_list_comprehension, ch06_05_tuples, ch06_06_dictionaries, ch06_07_dict_methods, ch06_08_nested_dicts, ch06_09_sets, ch06_10_combining_collections, } from './chapter06';
export { ch07_01_read_file, ch07_02_write_file, ch07_03_file_line_processing, ch07_04_csv_parsing, ch07_05_string_split_join, ch07_06_with_statement, ch07_07_json_parsing, ch07_08_data_transformation, } from './chapter07';
export { ch08_01_try_except, ch08_02_multiple_except, ch08_03_try_except_else_finally, ch08_04_raising_exceptions, ch08_05_custom_exception_classes, ch08_06_input_validation_with_errors, ch08_07_graceful_degradation, ch08_08_error_handling_in_loops, } from './chapter08';
export { ch09_01_importing_modules, ch09_02_from_import, ch09_03_lambda_functions, ch09_04_map_function, ch09_05_filter_function, ch09_06_list_comprehension_conditionals, ch09_07_dictionary_comprehension, ch09_08_string_formatting_advanced, ch09_09_regular_expressions, ch09_10_combining_tools, } from './chapter09';
export { ch10_01_simple_class, ch10_02_methods, ch10_03_init_constructor, ch10_04_str_repr, ch10_05_inheritance, ch10_06_method_override, ch10_07_encapsulation, ch10_08_class_static_methods, ch10_09_composition, ch10_10_polymorphism, } from './chapter10';
export { ch11_01_type_hints, ch11_02_dataclasses, ch11_03_assert_statements, ch11_04_writing_simple_tests, ch11_05_docstrings, ch11_06_constants_enums, ch11_07_list_typing, ch11_08_putting_it_together, } from './chapter11';
export { ch12_01_generators, ch12_02_generator_expressions, ch12_03_decorators_basics, ch12_04_decorators_with_args, ch12_05_context_managers, ch12_06_async_basics, ch12_07_pattern_matching, ch12_08_walrus_operator, ch12_09_advanced_comprehensions, ch12_10_final_showdown, } from './chapter12';
import type { Challenge } from '@venomous-snake/shared-types';
/** All challenges indexed by ID */
export declare const challengeMap: Record<string, Challenge>;
/** Get all challenges for a chapter */
export declare function getChallengesForChapter(chapterNumber: number): Challenge[];
//# sourceMappingURL=index.d.ts.map