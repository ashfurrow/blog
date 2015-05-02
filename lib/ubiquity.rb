# -*- coding: utf-8 -*- #

# Custom code-highlighting theme for mah blerg.

module Rouge
  module Themes
    class Ubiquity < CSSTheme
      walton            = '#398CCC'
      walton_dark       = '#456CCC'
      walton_light      = '#39B6CC'
      black             = '#404040'
      gray              = '#808080'
      gray_light        = '#EEEEEE'

      name 'ubiquity'

      style Comment::Multiline,               :fg => walton_light,:italic => true
      style Comment::Preproc,                 :fg => gray,        :bold => true
      style Comment::Single,                  :fg => walton_light,:italic => true
      style Comment::Special,                 :fg => gray,        :italic => true, :bold => true
      style Comment,                          :fg => walton_light,:italic => true
      style Error,                            :fg => walton_light,:bold => true
      style Generic::Deleted,                 :fg => black,       :bg => walton_light
      style Generic::Emph,                    :fg => black,       :italic => true
      style Generic::Error,                   :fg => walton_light
      style Generic::Heading,                 :fg => gray
      style Generic::Inserted,                :fg => black
      style Generic::Output,                  :fg => gray
      style Generic::Prompt,                  :fg => black
      style Generic::Strong,                                      :bold => true
      style Generic::Subheading,              :fg => gray
      style Generic::Traceback,               :fg => walton_dark
      style Keyword::Constant,                :fg => black,       :bold => true
      style Keyword::Declaration,             :fg => black,       :bold => true
      style Keyword::Namespace,               :fg => black,       :bold => true
      style Keyword::Pseudo,                  :fg => black,       :bold => true
      style Keyword::Reserved,                :fg => black,       :bold => true
      style Keyword::Type,                    :fg => walton_dark, :bold => true
      style Keyword,                          :fg => black,       :bold => true
      style Literal::Number::Float,           :fg => walton_light
      style Literal::Number::Hex,             :fg => walton_light
      style Literal::Number::Integer::Long,   :fg => walton_light
      style Literal::Number::Integer,         :fg => walton_light
      style Literal::Number::Oct,             :fg => walton_light
      style Literal::Number,                  :fg => walton_light
      style Literal::String::Backtick,        :fg => walton_light
      style Literal::String::Char,            :fg => walton_light
      style Literal::String::Doc,             :fg => walton_light
      style Literal::String::Double,          :fg => walton_light
      style Literal::String::Escape,          :fg => walton_light
      style Literal::String::Heredoc,         :fg => walton_light
      style Literal::String::Interpol,        :fg => walton_light
      style Literal::String::Other,           :fg => walton_light
      style Literal::String::Regex,           :fg => walton
      style Literal::String::Single,          :fg => walton_light
      style Literal::String::Symbol,          :fg => walton
      style Literal::String,                  :fg => walton_light
      style Name::Attribute,                  :fg => walton
      style Name::Builtin::Pseudo,            :fg => gray
      style Name::Builtin,                    :fg => walton_dark
      style Name::Class,                      :fg => walton_dark, :bold => true
      style Name::Constant,                   :fg => walton
      style Name::Decorator,                  :fg => gray,        :bold => true
      style Name::Entity,                     :fg => walton
      style Name::Exception,                  :fg => walton_light,:bold => true
      style Name::Function,                   :fg => walton_light,:bold => true
      style Name::Label,                      :fg => walton_light,:bold => true
      style Name::Namespace,                  :fg => gray
      style Name::Tag,                        :fg => black
      style Name::Variable::Class,            :fg => walton
      style Name::Variable::Global,           :fg => walton
      style Name::Variable::Instance,         :fg => walton
      style Name::Variable,                   :fg => walton
      style Operator::Word,                   :fg => black,       :bold => true
      style Operator,                         :fg => black,       :bold => true
      style Text::Whitespace,                 :fg => gray
    end
  end
end
